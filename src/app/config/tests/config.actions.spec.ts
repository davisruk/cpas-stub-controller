import * as fromConfig from '../store/config.actions';

describe('loadConfigs', () => {
  it('should return an action', () => {
    expect(fromConfig.loadConfigs().type).toBe('[Config] Load Configs');
  });
});
