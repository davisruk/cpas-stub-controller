import * as fromDspLiveStats from '../store/dsp-live-stats.actions';

describe('loadDspLiveStatss', () => {
  it('should return an action', () => {
    expect(fromDspLiveStats.loadDspLiveStatss().type).toBe('[DspLiveStats] Load DspLiveStatss');
  });
});
