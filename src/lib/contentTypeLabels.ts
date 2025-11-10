// Mapping of database content_type enum values to display labels
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  PDF: "PDF",
  Flipbook: "Interactive",
  YouTube: "Video Report",
};

// Reverse mapping for getting enum value from display label
export const CONTENT_TYPE_VALUES: Record<string, string> = {
  PDF: "PDF",
  Interactive: "Flipbook",
  "Video Report": "YouTube",
};

// Get display label from enum value
export const getContentTypeLabel = (type: string): string => {
  return CONTENT_TYPE_LABELS[type] || type;
};

// Get enum value from display label
export const getContentTypeValue = (label: string): string => {
  return CONTENT_TYPE_VALUES[label] || label;
};
