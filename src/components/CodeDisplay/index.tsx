import { CopyButton } from "@/components/CopyButton";

type CodeDisplayType = {
  code: string;
  language?: string;
  title?: string;
};

export const CodeDisplay = ({
  code,
  language = "text",
  title,
}: CodeDisplayType) => {
  return (
    <div className="bg-app-input rounded-lg overflow-hidden border border-app-accent/30">
      <div className="flex items-center justify-between px-4 py-2 bg-app-sidebar border-b border-app-accent/30">
        <span className="text-sm text-app-text-secondary font-mono">
          {title || language}
        </span>
        <CopyButton textToCopy={code} />
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed text-app-text whitespace-pre-wrap break-all">
          {code}
        </code>
      </pre>
    </div>
  );
};
