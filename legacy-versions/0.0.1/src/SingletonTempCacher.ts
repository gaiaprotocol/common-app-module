class SingletonTempCacher {
  private map = new Map<string | number, any>();

  public cache<DT>(id: string | number, data: DT) {
    this.map.set(id, data);
  }

  public get<DT>(id: string | number): DT | undefined {
    return this.map.get(id);
  }
}

export default new SingletonTempCacher();
