import Text from "@/shared/heading/Text";
import { FC, PropsWithChildren } from "react";

type AuthPageShellProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

const AuthPageShell: FC<AuthPageShellProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <Text as="h1" size="2xl" type="semibold" variant="primary">
            {title}
          </Text>
          {subtitle ? (
            <Text size="sm" variant="secondary" className="mt-2">
              {subtitle}
            </Text>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthPageShell;
