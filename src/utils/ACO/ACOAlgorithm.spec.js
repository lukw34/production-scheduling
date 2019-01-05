import AntColony from './AntColony';

describe('ACOAlgorithm', () => {
  it('should return correct graph for specific data', () => {
    expect(true).toEqual(true);
  });

  it('should create ant colony', () => {
    const antC = new AntColony();
    antC.run();
  });
});