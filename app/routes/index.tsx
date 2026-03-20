import type { ChangeEvent, ReactElement } from "react";
import {
  ClipboardList,
  Minus,
  Package2,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Skeleton } from "~/components/ui/Skeleton";
import { Textarea } from "~/components/ui/Textarea";
import {
  canEditWorkspace,
  canViewPricing,
  formatPriceVisibility,
  formatStarterQuoteCode,
  getCurrentWorkflowStep,
  getEstimateById,
  getEstimateLineItems,
  getEstimateTotals,
  getWorkflowProgress,
  type StarterPreConfiguration,
} from "~/lib/cpq-data";
import { cn } from "~/lib/utils";
import { useCpqWorkspaceStorage } from "~/utils/cpq-storage";

/**
 * Keeps the page headline aligned with the currently active starter sub-step so
 * the single-page template still feels like a real workflow instead of a static
 * form.
 */
function getStepGuidance(stepId: string | undefined): {
  eyebrow: string;
  heading: string;
  description: string;
} {
  switch (stepId) {
    case "customer-collection":
      return {
        eyebrow: "Step 1",
        heading: "Customer and collection context",
        description: "Name the customer, then establish the commercial collection this quote belongs to.",
      };
    case "year-sequence":
      return {
        eyebrow: "Step 2",
        heading: "Commercial numbering",
        description: "Set the year and sequence pattern your team wants the starter quote to follow.",
      };
    case "item-name":
      return {
        eyebrow: "Step 3",
        heading: "Item definition",
        description: "Capture the first sellable item name so the quote has a usable commercial label.",
      };
    case "confirmation":
      return {
        eyebrow: "Step 4",
        heading: "Confirmation",
        description: "Review the starter scope and leave the handoff notes this first stage should own.",
      };
    default:
      return {
        eyebrow: "Step 1",
        heading: "Customer and collection context",
        description: "Name the customer, then establish the commercial collection this quote belongs to.",
      };
  }
}

/**
 * Formats the starter line count into a compact shell-friendly label.
 */
function formatLineCount(lineCount: number): string {
  return `${lineCount} ${lineCount === 1 ? "line" : "lines"}`;
}

/**
 * Single-page CPQ starter route. The page owns one meaningful first-stage flow
 * instead of generic explanatory copy so template users can extend something
 * that already behaves like quote setup.
 */
export default function IndexPage(): ReactElement {
  const {
    workspace,
    isHydrated,
    updateStarterPreConfigurationField,
    addCatalogItem,
    addPackage,
    updateSelectionQuantity,
    removeSelection,
  } = useCpqWorkspaceStorage();

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-60 w-full rounded-2xl" />
      </div>
    );
  }

  const activeEstimate = getEstimateById(workspace, workspace.active_estimate_id);
  const currentWorkflowStep = getCurrentWorkflowStep(workspace);
  const workflowProgress = getWorkflowProgress(workspace);
  const stepGuidance = getStepGuidance(currentWorkflowStep?.stepId);
  const lineItems = activeEstimate
    ? getEstimateLineItems(workspace, activeEstimate.id)
    : [];
  const totals = activeEstimate
    ? getEstimateTotals(workspace, activeEstimate.id)
    : {
        subtotal: 0,
        packageSavings: 0,
        modifiersTotal: 0,
        total: 0,
        marginPercent: 0,
        itemCount: 0,
      };
  const starterPackage = workspace.packages[0] ?? null;
  const complianceAddOn =
    workspace.catalog.find((item) => item.id === "item-inspection-plan") ??
    workspace.catalog[0] ??
    null;
  const starterPackageLoaded =
    starterPackage !== null &&
    lineItems.some((lineItem) => lineItem.package_id === starterPackage.id);
  const complianceAddOnLoaded =
    complianceAddOn !== null &&
    lineItems.some(
      (lineItem) =>
        lineItem.item_id === complianceAddOn.id && lineItem.package_id === null,
    );
  const starterPreConfiguration = workspace.starter_pre_configuration ?? {
    customer_name: "",
    collection_name: "",
    quote_year: "",
    sequence_code: "",
    item_name: "",
    confirmation_notes: "",
  };
  const starterQuoteCode = formatStarterQuoteCode(starterPreConfiguration);
  const isEditable = canEditWorkspace(workspace.ui.active_role);
  const canSeePricing = canViewPricing(workspace.ui.active_role);

  /**
   * The starter form persists the first-stage quote metadata so template users
   * can extend a real CPQ surface instead of replacing placeholder marketing
   * text.
   */
  const handleStarterFieldChange = (
    field: keyof StarterPreConfiguration,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    updateStarterPreConfigurationField(field, event.target.value);
  };

  /**
   * The starter package action deliberately seeds a usable first quote payload
   * on one click, which keeps this single page commercial and testable.
   */
  const handleLoadStarterPackage = (): void => {
    if (!activeEstimate || !starterPackage) {
      return;
    }

    addPackage(activeEstimate.id, starterPackage.id);
  };

  /**
   * A single add-on keeps the starter quoting surface practical without
   * reintroducing the old configure page complexity.
   */
  const handleLoadComplianceAddOn = (): void => {
    if (!activeEstimate || !complianceAddOn) {
      return;
    }

    addCatalogItem(activeEstimate.id, complianceAddOn.id);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-stone-200 bg-card shadow-sm dark:border-zinc-800">
        <div className="flex flex-col gap-5 border-b border-stone-200 px-6 py-5 dark:border-zinc-800 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-zinc-400">
              {stepGuidance.eyebrow}
            </div>
            <div className="space-y-1.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-stone-950 dark:text-zinc-100 lg:text-[24px]">
                {stepGuidance.heading}
              </h1>
              <p className="max-w-2xl text-[13px] leading-5 text-stone-600 dark:text-zinc-300">
                {stepGuidance.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 lg:max-w-[430px] lg:justify-end">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-zinc-400">
                Quote
              </span>
              <span className="font-semibold text-stone-950 dark:text-zinc-100">
                {starterQuoteCode}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-zinc-400">
                Progress
              </span>
              <span className="font-semibold text-stone-950 dark:text-zinc-100">
                {workflowProgress.completeSteps} / {workflowProgress.totalSteps}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-zinc-400">
                Step
              </span>
              <span className="font-semibold text-stone-950 dark:text-zinc-100">
                {currentWorkflowStep?.stepLabel ?? "Customer & Collection"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-5">
          <Input
            label="Customer"
            value={starterPreConfiguration.customer_name}
            placeholder="DR Inc"
            className="h-10 text-sm"
            disabled={!isEditable}
            onChange={(event) =>
              handleStarterFieldChange("customer_name", event)
            }
          />

          <Input
            label="Collection"
            value={starterPreConfiguration.collection_name}
            placeholder="Custom Hoist Line"
            className="h-10 text-sm"
            disabled={!isEditable}
            onChange={(event) =>
              handleStarterFieldChange("collection_name", event)
            }
          />

          <Input
            label="Quote Year"
            value={starterPreConfiguration.quote_year}
            placeholder="2026"
            className="h-10 text-sm"
            disabled={!isEditable}
            onChange={(event) => handleStarterFieldChange("quote_year", event)}
          />

          <Input
            label="Sequence"
            value={starterPreConfiguration.sequence_code}
            placeholder="001"
            className="h-10 text-sm"
            disabled={!isEditable}
            onChange={(event) =>
              handleStarterFieldChange("sequence_code", event)
            }
          />

          <Input
            label="Item Name"
            value={starterPreConfiguration.item_name}
            placeholder="Under Running Crane"
            className="h-10 text-sm"
            disabled={!isEditable}
            onChange={(event) => handleStarterFieldChange("item_name", event)}
          />
        </div>

        <div className="border-t border-stone-200 px-6 py-6 dark:border-zinc-800">
          <Textarea
            label="Confirmation Notes"
            value={starterPreConfiguration.confirmation_notes}
            placeholder="Capture approvals, handoff notes, or scope caveats for this first CPQ stage."
            className="min-h-24 text-sm"
            disabled={!isEditable}
            onChange={(event) =>
              handleStarterFieldChange("confirmation_notes", event)
            }
          />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[28px] border border-stone-200 bg-card shadow-sm dark:border-zinc-800">
          <div className="flex flex-col gap-4 border-b border-stone-200 px-6 py-5 dark:border-zinc-800 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-[18px] font-semibold text-stone-950 dark:text-zinc-100">
                Starter Scope
              </h2>
              <p className="max-w-2xl text-[13px] leading-5 text-stone-500 dark:text-zinc-400">
                Load a package, add one compliance line, then use the quantity controls as the starter quoting pattern.
              </p>
            </div>
            <div className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {formatLineCount(lineItems.length)}
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-stone-200 bg-white p-2 text-stone-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
                  <Package2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-semibold text-stone-950 dark:text-zinc-100">
                    {starterPackage?.name ?? "Starter package"}
                  </div>
                  <div className="mt-1 text-[13px] leading-5 text-stone-500 dark:text-zinc-400">
                    {starterPackage?.description ??
                      "Use one starter package so new teams have a concrete CPQ action to extend."}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-sm text-stone-500 dark:text-zinc-400">
                  Discount
                </div>
                <div className="text-sm font-medium text-stone-950 dark:text-zinc-100">
                  {starterPackage
                    ? `${Math.round(starterPackage.discount_rate * 100)}% starter package`
                    : "Unavailable"}
                </div>
              </div>

              <Button
                className="mt-5 w-full justify-center"
                variant={starterPackageLoaded ? "secondary" : "outline"}
                disabled={!isEditable || !starterPackage || starterPackageLoaded}
                onClick={handleLoadStarterPackage}
              >
                <Package2 className="h-4 w-4" />
                <span>
                  {starterPackageLoaded ? "Starter Package Loaded" : "Load Starter Package"}
                </span>
              </Button>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-stone-200 bg-white p-2 text-stone-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-semibold text-stone-950 dark:text-zinc-100">
                    {complianceAddOn?.name ?? "Compliance add-on"}
                  </div>
                  <div className="mt-1 text-[13px] leading-5 text-stone-500 dark:text-zinc-400">
                    {complianceAddOn?.description ??
                      "Add one standalone service line so quantity and removal actions are visible in the starter."}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-sm text-stone-500 dark:text-zinc-400">
                  Unit Price
                </div>
                <div className="text-sm font-medium text-stone-950 dark:text-zinc-100">
                  {complianceAddOn
                    ? formatPriceVisibility(
                        complianceAddOn.unit_price,
                        workspace.ui.active_role,
                      )
                    : "Unavailable"}
                </div>
              </div>

              <Button
                className="mt-5 w-full justify-center"
                variant={complianceAddOnLoaded ? "secondary" : "outline"}
                disabled={!isEditable || !complianceAddOn || complianceAddOnLoaded}
                onClick={handleLoadComplianceAddOn}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {complianceAddOnLoaded ? "Compliance Add-on Loaded" : "Add Compliance Line"}
                </span>
              </Button>
            </div>
          </div>

          <div className="border-t border-stone-200 px-6 py-6 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-stone-900 dark:text-zinc-100">
              <ClipboardList className="h-4 w-4 text-stone-500 dark:text-zinc-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Quote Scope
              </span>
            </div>

            {lineItems.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 text-[13px] leading-5 text-stone-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                Load the starter package or compliance line to create the first quote scope.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {lineItems.map((lineItem) => (
                  <div
                    key={lineItem.id}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold text-stone-950 dark:text-zinc-100">
                          {lineItem.name}
                        </div>
                        <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-zinc-500">
                          {lineItem.sku}
                        </div>
                        <div className="mt-2 text-[13px] leading-5 text-stone-500 dark:text-zinc-400">
                          {lineItem.description}
                        </div>
                      </div>

                      <div className="min-w-[130px] text-left lg:text-right">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-zinc-500">
                          Line Total
                        </div>
                        <div className="mt-1.5 text-sm font-semibold text-stone-950 dark:text-zinc-100">
                          {formatPriceVisibility(
                            lineItem.line_total,
                            workspace.ui.active_role,
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 border-t border-stone-200 pt-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-stone-500 dark:text-zinc-400">
                        Lead time {lineItem.lead_time_days} days
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Decrease quantity for ${lineItem.name}`}
                          disabled={!isEditable || lineItem.quantity <= 1}
                          onClick={() =>
                            updateSelectionQuantity(
                              workspace.active_estimate_id,
                              lineItem.id,
                              lineItem.quantity - 1,
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <div className="min-w-10 text-center text-sm font-semibold text-stone-950 dark:text-zinc-100">
                          {lineItem.quantity}
                        </div>

                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Increase quantity for ${lineItem.name}`}
                          disabled={!isEditable}
                          onClick={() =>
                            updateSelectionQuantity(
                              workspace.active_estimate_id,
                              lineItem.id,
                              lineItem.quantity + 1,
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={!isEditable}
                          onClick={() =>
                            removeSelection(workspace.active_estimate_id, lineItem.id)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[28px] border border-stone-200 bg-card px-5 py-5 shadow-sm dark:border-zinc-800">
            <div className="flex items-center gap-2 text-stone-900 dark:text-zinc-100">
              <Sparkles className="h-4 w-4 text-stone-500 dark:text-zinc-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Quote Summary
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="text-sm text-stone-500 dark:text-zinc-400">
                  Customer
                </div>
                <div className="mt-1 text-[15px] font-semibold text-stone-950 dark:text-zinc-100">
                  {starterPreConfiguration.customer_name.trim() || "Starter Workspace"}
                </div>
              </div>

              <div>
                <div className="text-sm text-stone-500 dark:text-zinc-400">
                  Collection
                </div>
                <div className="mt-1 text-[14px] font-medium text-stone-950 dark:text-zinc-100">
                  {starterPreConfiguration.collection_name.trim() || "Single-page CPQ starter"}
                </div>
              </div>

              <div>
                <div className="text-sm text-stone-500 dark:text-zinc-400">
                  Item
                </div>
                <div className="mt-1 text-[14px] font-medium text-stone-950 dark:text-zinc-100">
                  {starterPreConfiguration.item_name.trim() || "Starter Configured Item"}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-zinc-400">
                    Scope Value
                  </div>
                  <div className="mt-1.5 text-[15px] font-semibold text-stone-950 dark:text-zinc-100">
                    {formatPriceVisibility(totals.total, workspace.ui.active_role)}
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-zinc-400">
                    Quantity
                  </div>
                  <div className="mt-1.5 text-[15px] font-semibold text-stone-950 dark:text-zinc-100">
                    {totals.itemCount}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-card px-5 py-5 shadow-sm dark:border-zinc-800">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-900 dark:text-zinc-100">
              Commercial Snapshot
            </div>

            <div className="mt-4 space-y-3 text-sm text-stone-600 dark:text-zinc-300">
              <div className="flex items-center justify-between gap-3">
                <span>Package savings</span>
                <span className="font-medium text-stone-950 dark:text-zinc-100">
                  {formatPriceVisibility(
                    totals.packageSavings,
                    workspace.ui.active_role,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span>Subtotal</span>
                <span className="font-medium text-stone-950 dark:text-zinc-100">
                  {formatPriceVisibility(totals.subtotal, workspace.ui.active_role)}
                </span>
              </div>

              <div
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3",
                  canSeePricing
                    ? "border-stone-200 bg-stone-50 dark:border-zinc-800 dark:bg-zinc-900"
                    : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
                )}
              >
                <span>Margin</span>
                <span className="font-semibold text-stone-950 dark:text-zinc-100">
                  {canSeePricing ? `${totals.marginPercent.toFixed(1)}%` : "Hidden"}
                </span>
              </div>
            </div>
          </section>

          {!isEditable && (
            <section className="rounded-[28px] border border-stone-200 bg-card px-5 py-4 text-sm leading-6 text-stone-500 shadow-sm dark:border-zinc-800 dark:text-zinc-400">
              {workspace.ui.active_role} role can review this starter quote, but only admin and estimator can edit the pre-configuration fields or scope.
            </section>
          )}
        </aside>
      </section>
    </div>
  );
}
