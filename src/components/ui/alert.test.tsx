import { render, screen } from '@testing-library/react';
import { Alert, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders alert with description', () => {
    render(
      <Alert>
        <AlertDescription>Test alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });
});
