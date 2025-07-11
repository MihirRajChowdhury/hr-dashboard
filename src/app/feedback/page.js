'use client';
import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        We value your feedback
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Help us improve the dashboard by sharing your thoughts.
      </p>

      <FeedbackForm />
    </main>
  );
}
