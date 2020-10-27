import * as fromToteMessages from '../store/tote-messages.actions';

describe('loadToteMessagess', () => {
  it('should return an action', () => {
    expect(fromToteMessages.loadToteMessagess().type).toBe('[ToteMessages] Load ToteMessagess');
  });
});
