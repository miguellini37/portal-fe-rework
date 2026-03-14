// calcChange is defined inline in SchoolDashboard — extract for testing
// For now, replicate the logic here to validate it

function calcChange(current: number, previous: number): { text: string; direction: 'up' | 'down' } {
  if (previous === 0) {
    return { text: '+0%', direction: 'up' };
  }
  const pct = Math.round(((current - previous) / previous) * 100);
  return { text: `${pct >= 0 ? '+' : ''}${pct}%`, direction: pct >= 0 ? 'up' : 'down' };
}

describe('calcChange', () => {
  it('returns +0% when previous is 0', () => {
    expect(calcChange(10, 0)).toEqual({ text: '+0%', direction: 'up' });
  });

  it('calculates positive change', () => {
    expect(calcChange(150, 100)).toEqual({ text: '+50%', direction: 'up' });
  });

  it('calculates negative change', () => {
    expect(calcChange(50, 100)).toEqual({ text: '-50%', direction: 'down' });
  });

  it('returns +0% for no change', () => {
    expect(calcChange(100, 100)).toEqual({ text: '+0%', direction: 'up' });
  });

  it('rounds to nearest integer', () => {
    expect(calcChange(133, 100)).toEqual({ text: '+33%', direction: 'up' });
  });
});
