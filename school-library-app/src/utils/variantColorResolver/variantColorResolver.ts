import {
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
} from "@mantine/core";
const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Completely override variant
  if (input.variant === "light") {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `${rem(1)} solid ${parsedColor.value}`,
      color: parsedColor.value,
    };
  }

  return defaultResolvedColors;
};

export default variantColorResolver;
