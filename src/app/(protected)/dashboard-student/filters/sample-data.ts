// region Options Constants
export const ACADEMIC_YEAR_OPTIONS = [
  { label: '2026', value: '2026' },
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
];

export const GENDER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Boys', value: 'boys' },
  { label: 'Girls', value: 'girls' },
];

export const GRADE_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Grade A', value: 'A' },
  { label: 'Grade B', value: 'B' },
  { label: 'Grade C', value: 'C' },
  { label: 'Grade D', value: 'D' },
  { label: 'Grade E', value: 'E' },
  { label: 'Grade F', value: 'F' },
];

// region Options Constants
export const CLASS_OPTIONS = [
  { label: 'All', value: 'all-classes' },
  { label: 'Pre-KG', value: 'pre-kg' },
  { label: 'LKG', value: 'lkg' },
  { label: 'UKG', value: 'ukg' },
  { label: '1st Class', value: 'first-class' },
  { label: '2nd Class', value: 'second-class' },
  { label: '3rd Class', value: 'third-class' },
  { label: '4th Class', value: 'fourth-class' },
  { label: '5th Class', value: 'fifth-class' },
  { label: '6th Class', value: 'sixth-class' },
  { label: '7th Class', value: 'seventh-class' },
  { label: '8th Class', value: 'eighth-class' },
  { label: '9th Class', value: 'ninth-class' },
  { label: '10th Class', value: 'tenth-class' },
];

export const SECTION_OPTIONS_BY_CLASS: Record<string, { label: string; value: string }[]> = {
  'all-classes': [
    { label: 'All', value: 'all-sections' },
  ],
  'pre-kg': [],
  'lkg': [
    { label: 'Section A', value: 'lkg-a' },
  ],

  'ukg': [
    { label: 'Section A', value: 'ukg-a' },
    { label: 'Section B', value: 'ukg-b' },
  ],

  'first-class': [
    { label: 'Section A', value: 'first-class-a' },
    { label: 'Section B', value: 'first-class-b' },
    { label: 'Section C', value: 'first-class-c' },
  ],

  'second-class': [
    { label: 'Section A', value: 'second-class-a' },
    { label: 'Section B', value: 'second-class-b' },
  ],

  'third-class': [
    { label: 'Section A', value: 'third-class-a' },
    { label: 'Section B', value: 'third-class-b' },
    { label: 'Section C', value: 'third-class-c' },
  ],

  'fourth-class': [
    { label: 'Section A', value: 'fourth-class-a' },
  ],

  'fifth-class': [
    { label: 'Section A', value: 'fifth-class-a' },
    { label: 'Section B', value: 'fifth-class-b' },
    { label: 'Section C', value: 'fifth-class-c' },
    { label: 'Section D', value: 'fifth-class-d' },
  ],

  'sixth-class': [
    { label: 'Section A', value: 'sixth-class-a' },
    { label: 'Section B', value: 'sixth-class-b' },
  ],

  'seventh-class': [
    { label: 'Section A', value: 'seventh-class-a' },
    { label: 'Section B', value: 'seventh-class-b' },
    { label: 'Section C', value: 'seventh-class-c' },
  ],

  'eighth-class': [
    { label: 'Section A', value: 'eighth-class-a' },
    { label: 'Section B', value: 'eighth-class-b' },
  ],

  'ninth-class': [
    { label: 'Section A', value: 'ninth-class-a' },
    { label: 'Section B', value: 'ninth-class-b' },
  ],

  'tenth-class': [
    { label: 'Section A', value: 'tenth-class-a' },
  ],
};