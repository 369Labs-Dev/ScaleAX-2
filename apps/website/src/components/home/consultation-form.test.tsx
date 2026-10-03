import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsultationForm } from './consultation-form';

// Part A, Section 11 — "Book a consultation" client-side validation and the
// happy path against the /api/consultation stub.
describe('ConsultationForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a required-field error for each empty field and does not submit', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm />);

    await user.click(screen.getByRole('button', { name: /book a consultation/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/company is required/i)).toBeInTheDocument();
    expect(screen.getByText(/work email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects an invalid work email without submitting', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^company/i), 'Acme Inc');
    await user.type(screen.getByLabelText(/work email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^country/i), 'United States');
    await user.click(screen.getByRole('button', { name: /book a consultation/i }));

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits valid data to /api/consultation and shows the thank-you message', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const user = userEvent.setup();
    render(<ConsultationForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^company/i), 'Acme Inc');
    await user.type(screen.getByLabelText(/work email/i), 'jane@acme.com');
    await user.type(screen.getByLabelText(/^country/i), 'United States');
    await user.click(screen.getByRole('button', { name: /book a consultation/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/consultation', expect.any(Object)),
    );
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
    expect(screen.getByText(/our team will reply within one working day/i)).toBeInTheDocument();
  });

  it('shows an error message when the submission fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('network error'));
    const user = userEvent.setup();
    render(<ConsultationForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^company/i), 'Acme Inc');
    await user.type(screen.getByLabelText(/work email/i), 'jane@acme.com');
    await user.type(screen.getByLabelText(/^country/i), 'United States');
    await user.click(screen.getByRole('button', { name: /book a consultation/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
  });
});
