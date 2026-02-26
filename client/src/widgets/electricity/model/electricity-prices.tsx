export class ElectricityPrice {
  time_start!: string
  NOK_per_kWh!: number
}

export class ComponentData {
  labels: string[]
  datasets: Datasets[]

  constructor(labels: string[], datasets: Datasets[]) {
    this.labels = labels;
    this.datasets = datasets;
  }

}

export class Datasets {
  data: number[]
  backgroundColor: string[]
  defaultColor = 'rgba(0, 184, 241, 0.8)'
  highlightindexes?: HighlightIndex

  constructor(data: number[], highlightindexes?: number[]) {
    this.data = data;
    this.highlightindexes = new HighlightIndex(highlightindexes);
    
    this.backgroundColor = data.map((_, i) => this.getBackgroundColor(i)); 
  }

  getBackgroundColor(i: number): string {
    if(!this.highlightindexes)
      return this.defaultColor
    
    if(this.highlightindexes.indexes.includes(i))
      return this.highlightindexes.backgroundColor
    return this.defaultColor;
  }

}

export class HighlightIndex {
  indexes: number[]
  backgroundColor = 'rgba(0, 153, 241, 0.8)'
  constructor(indexes?: number[]) {
     this.indexes = indexes ?? [];
  }
}