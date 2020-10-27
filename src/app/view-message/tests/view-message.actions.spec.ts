import * as fromViewMessage from '../store/view-message.actions';

describe('loadViewMessages', () => {
  it('should return an action', () => {
    expect(fromViewMessage.loadViewMessages().type).toBe('[ViewMessage] Load ViewMessages');
  });
});
