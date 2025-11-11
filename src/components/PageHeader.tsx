import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface Crumb {
  label: string;
  href?: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  crumbs?: Crumb[];
}

const PageHeader = ({ title, description, actions, crumbs }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      {crumbs && crumbs.length > 0 && (
        <div className="mb-3">
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((c, idx) => {
                const isLast = idx === crumbs.length - 1;
                return (
                  <div key={`${c.label}-${idx}`} className="flex items-center">
                    <BreadcrumbItem>
                      {isLast || c.current ? (
                        <BreadcrumbPage className="text-muted-foreground">{c.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={c.href || "#"} className="text-muted-foreground hover:text-foreground">
                          {c.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;

