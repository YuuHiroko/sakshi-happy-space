import { render, screen, fireEvent } from '@testing-library/react';
import WishCollection from '../WishCollection';

describe('WishCollection', () => {
  beforeEach(() => {
    // Mock localStorage
    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return store[key] || null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      length: 0,
      key: (index: number) => null
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    });
  });

  test('renders the component', () => {
    render(<WishCollection storageKey="test-wishes" />);
    expect(screen.getByText('Add Your Birthday Wish')).toBeInTheDocument();
  });

  test('shows the form when the "Add Your Birthday Wish" button is clicked', () => {
    render(<WishCollection storageKey="test-wishes" />);
    fireEvent.click(screen.getByText('Add Your Birthday Wish'));
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your beautiful wish for Sakshi...')).toBeInTheDocument();
  });

  test('shows suggested replies when the form is open', () => {
    render(<WishCollection storageKey="test-wishes" />);
    fireEvent.click(screen.getByText('Add Your Birthday Wish'));
    expect(screen.getByText('Happy Birthday!')).toBeInTheDocument();
  });

  test('fills the textarea when a suggested reply is clicked', () => {
    render(<WishCollection storageKey="test-wishes" />);
    fireEvent.click(screen.getByText('Add Your Birthday Wish'));
    fireEvent.click(screen.getByText('Happy Birthday!'));
    expect(screen.getByPlaceholderText('Write your beautiful wish for Sakshi...')).toHaveValue('Happy Birthday!');
  });
});
