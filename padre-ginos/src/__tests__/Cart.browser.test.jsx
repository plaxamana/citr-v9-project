import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Cart from '../Cart';

describe('Cart', () => {
  test("snapshot with nothing in cart" , async () => {
    const { asFragment } = render(<Cart cart={[]} />);
    expect(asFragment()).toMatchSnapshot();
  })
})