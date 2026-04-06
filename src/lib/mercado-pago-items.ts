export type VariationSelection = {
  selectedSize?: string;
  selectedColor?: string;
};

export type MercadoPagoItemInput = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number | null;
} & VariationSelection;

export type MercadoPagoCheckoutItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: "BRL";
};

export type MercadoPagoPaymentItem = {
  id?: string;
  title?: string;
  description?: string;
  quantity?: number;
  unit_price?: number;
};

export type MercadoPagoItemDifference = {
  itemId: string;
  field:
    | "id"
    | "title"
    | "description"
    | "quantity"
    | "unit_price"
    | "selectedSize"
    | "selectedColor"
    | "missing"
    | "unexpected";
  expected?: string | number;
  actual?: string | number;
  message: string;
};

export type MercadoPagoReconciliationReport = {
  matched: boolean;
  expectedCount: number;
  paymentCount: number;
  differences: MercadoPagoItemDifference[];
};

function normalizeVariationValue(value?: string) {
  return value?.trim() || undefined;
}

export function normalizeColorLabel(value?: string) {
  const normalized = normalizeVariationValue(value);

  if (!normalized) {
    return undefined;
  }

  return normalized
    .toLocaleLowerCase("pt-BR")
    .split(/\s+/)
    .map((part) => {
      if (!part) {
        return part;
      }

      return part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1);
    })
    .join(" ");
}

function normalizeVariationIdSegment(value?: string) {
  const normalized = normalizeVariationValue(value);

  if (!normalized) {
    return undefined;
  }

  return normalized
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeComparisonText(value?: string) {
  return normalizeVariationValue(value)?.replace(/\s+/g, " ") ?? "";
}

export function buildVariationItemId(
  itemId: string,
  variation: VariationSelection,
) {
  const parts = [itemId.trim()];
  const size = normalizeVariationIdSegment(variation.selectedSize);
  const color = normalizeVariationIdSegment(variation.selectedColor);

  if (size) {
    parts.push(size);
  }

  if (color) {
    parts.push(color);
  }

  return parts.join("-");
}

export function buildVariationTitle(
  itemName: string,
  variation: VariationSelection,
) {
  const parts = [itemName];

  if (variation.selectedSize) {
    parts.push(normalizeVariationValue(variation.selectedSize) ?? "");
  }

  if (variation.selectedColor) {
    parts.push(normalizeColorLabel(variation.selectedColor) ?? "");
  }

  return parts.filter(Boolean).join(" - ");
}

export function buildVariationDescription(
  itemDescription: string,
  variation: VariationSelection,
) {
  const parts = [itemDescription];

  if (variation.selectedSize) {
    parts.push(`Tamanho: ${normalizeVariationValue(variation.selectedSize)}`);
  }

  if (variation.selectedColor) {
    parts.push(`Cor: ${normalizeColorLabel(variation.selectedColor)}`);
  }

  return parts.filter(Boolean).join(" | ");
}

export function buildMercadoPagoItemPayload(
  item: MercadoPagoItemInput,
): MercadoPagoCheckoutItem {
  const hasVariation = Boolean(item.selectedSize || item.selectedColor);

  return {
    id: buildVariationItemId(item.id, {
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
    }),
    title: hasVariation
      ? buildVariationTitle(item.name, {
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })
      : item.name,
    quantity: item.quantity,
    currency_id: "BRL",
    unit_price: item.unitPrice ?? 0,
    description: hasVariation
      ? buildVariationDescription(item.description, {
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })
      : item.description,
  };
}

function extractVariationFromTitle(title?: string) {
  const segments = normalizeComparisonText(title)
    .split(" - ")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    baseName: segments[0],
    selectedSize: segments[1],
    selectedColor: segments.length > 2 ? segments.slice(2).join(" - ") : undefined,
  };
}

function extractVariationFromDescription(description?: string) {
  const sizeMatch = normalizeComparisonText(description).match(/(?:^|\|)\s*Tamanho:\s*([^|]+)/i);
  const colorMatch = normalizeComparisonText(description).match(/(?:^|\|)\s*Cor:\s*([^|]+)/i);

  return {
    selectedSize: sizeMatch?.[1]?.trim(),
    selectedColor: colorMatch?.[1]?.trim(),
  };
}

function compareText(
  itemId: string,
  field: MercadoPagoItemDifference["field"],
  expected?: string,
  actual?: string,
) {
  if (normalizeComparisonText(expected) === normalizeComparisonText(actual)) {
    return null;
  }

  return {
    itemId,
    field,
    expected,
    actual,
    message: `Divergencia em ${field} para o item ${itemId}.`,
  } satisfies MercadoPagoItemDifference;
}

function compareNumber(
  itemId: string,
  field: MercadoPagoItemDifference["field"],
  expected?: number,
  actual?: number,
) {
  if (expected === actual) {
    return null;
  }

  return {
    itemId,
    field,
    expected,
    actual,
    message: `Divergencia em ${field} para o item ${itemId}.`,
  } satisfies MercadoPagoItemDifference;
}

export function reconcileMercadoPagoItems(
  expectedItems: MercadoPagoItemInput[],
  paymentItems: MercadoPagoPaymentItem[],
) {
  const differences: MercadoPagoItemDifference[] = [];
  const expectedById = new Map(
    expectedItems.map((item) => [buildMercadoPagoItemPayload(item).id, item] as const),
  );
  const paymentById = new Map(
    paymentItems.map((item, index) => {
      const key = item.id?.trim() || `__missing__${index}`;
      return [key, item] as const;
    }),
  );

  for (const [itemId, expectedItem] of expectedById.entries()) {
    const expectedPayload = buildMercadoPagoItemPayload(expectedItem);
    const actualItem = paymentById.get(itemId);

    if (!actualItem) {
      differences.push({
        itemId,
        field: "missing",
        expected: expectedPayload.title,
        message: `Item ausente no pagamento do Mercado Pago: ${itemId}.`,
      });
      continue;
    }

    const titleVariation = extractVariationFromTitle(actualItem.title);
    const descriptionVariation = extractVariationFromDescription(actualItem.description);

    const checks = [
      compareText(itemId, "id", expectedPayload.id, actualItem.id),
      compareText(itemId, "title", expectedPayload.title, actualItem.title),
      compareText(itemId, "description", expectedPayload.description, actualItem.description),
      compareNumber(itemId, "quantity", expectedPayload.quantity, actualItem.quantity),
      compareNumber(itemId, "unit_price", expectedPayload.unit_price, actualItem.unit_price),
      compareText(itemId, "selectedSize", expectedItem.selectedSize, titleVariation.selectedSize ?? descriptionVariation.selectedSize),
      compareText(itemId, "selectedColor", normalizeColorLabel(expectedItem.selectedColor), titleVariation.selectedColor ?? descriptionVariation.selectedColor),
    ];

    const resolvedChecks = checks.filter((value) => value !== null) as MercadoPagoItemDifference[];

    differences.push(...resolvedChecks);
  }

  for (const [itemId] of paymentById.entries()) {
    if (!expectedById.has(itemId)) {
      differences.push({
        itemId,
        field: "unexpected",
        actual: itemId,
        message: `Item inesperado retornado pelo Mercado Pago: ${itemId}.`,
      });
    }
  }

  return {
    matched: differences.length === 0,
    expectedCount: expectedItems.length,
    paymentCount: paymentItems.length,
    differences,
  };
}
