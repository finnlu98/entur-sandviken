export enum ElectricityLevel {
  Level1 = 2,
  Level2 = 5,
  Level3 = 10,
  Level4 = 15,
  Level5 = 20,
}

export enum ElectricityLevelFixedPrice {
  Level1 = 125,
  Level2 = 190,
  Level3 = 300,
  Level4 = 410,
  Level5 = 520,
}

export const GetSortedElectricityLevel = () => {
  return Object.values(ElectricityLevel).filter((v) => typeof v === 'number') as number[];
};

export const GetElectricityLevel = (value: number) => {
  const sorted = GetSortedElectricityLevel();

  for (const threshold of sorted) {
    if (value <= threshold) {
      return threshold as ElectricityLevel;
    }
  }

  return undefined;
};

export class ElectricityLevelFormatter {
  static formatLevel(level: ElectricityLevel | undefined): string {
    if (level === undefined) return '';
    const key = ElectricityLevel[level];
    const number = key.replace('Level', '');
    return number;
  }

  static formatInterval(level: ElectricityLevel | undefined): string {
    if (!level) return 'Unkown';

    const values = GetSortedElectricityLevel().sort((a, b) => a - b);

    const max = level;
    const index = values.indexOf(level);
    const min = index === 0 ? 0 : values[index - 1];

    return `${min}–${max}`;
  }
}
