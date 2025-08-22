import { FC } from 'react';
import { IJobPayload } from '../../../api/job';

interface Props {
  job: IJobPayload;
}

export const Requirements: FC<Props> = ({ job }) => {
  // Helper function to parse requirements from description or dedicated fields
  const parseRequirements = (text: string): string[] => {
    if (!text) return [];

    // Look for bullet points, numbered lists, or line breaks
    const lines = text.split(/\n|\r\n|\r/);
    const requirements: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (
        trimmed &&
        (trimmed.startsWith('•') ||
          trimmed.startsWith('-') ||
          trimmed.startsWith('*') ||
          /^\d+\./.test(trimmed) ||
          trimmed.toLowerCase().includes('require') ||
          trimmed.toLowerCase().includes('must have') ||
          trimmed.toLowerCase().includes('prefer'))
      ) {
        requirements.push(trimmed.replace(/^[•\-*\d.]\s*/, ''));
      }
    }

    return requirements;
  };

  const requirements = job.requirements ? parseRequirements(job.requirements) : [];

  return (
    <div className="space-y-8">
      {/* Full Requirements Text */}
      {job.requirements && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Requirements</h3>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{requirements}</p>
          </div>
        </div>
      )}
    </div>
  );
};
