"use client";

/**
 * REFERENCE-ONLY COMPONENT
 *
 * Delete this file before implementing the actual user request or product task.
 * It exists only as a local shadcn component reference surface for this template.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  BellIcon,
  CommandIcon,
  CreditCardIcon,
  Layers3Icon,
  SearchIcon,
  Settings2Icon,
  SparklesIcon,
  TablePropertiesIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useState, type ReactElement, type ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { toast as sonnerToast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Alert } from "~/components/ui/Alert";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/Badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/Breadcrumb";
import { Button } from "~/components/ui/Button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "~/components/ui/button-group";
import { Calendar } from "~/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Combobox } from "~/components/ui/combobox";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { DatePicker } from "~/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DirectionProvider, useDirection } from "~/components/ui/direction";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "~/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Input } from "~/components/ui/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "~/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { Kbd, KbdGroup } from "~/components/ui/kbd";
import { Label } from "~/components/ui/Label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { NativeSelect } from "~/components/ui/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { Progress } from "~/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select } from "~/components/ui/Select";
import { Separator } from "~/components/ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/Sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "~/components/ui/Sidebar";
import { Skeleton } from "~/components/ui/Skeleton";
import { Slider } from "~/components/ui/slider";
import { Spinner } from "~/components/ui/spinner";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/Textarea";
import { ToastAction } from "~/components/ui/toast";
import { Toggle } from "~/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/Tooltip";
import { toast as legacyToast } from "~/hooks/use-toast";

type DealRow = {
  account: string;
  owner: string;
  stage: string;
  value: string;
};

const chartData = [
  { stage: "Discover", velocity: 22, quality: 18 },
  { stage: "Scope", velocity: 36, quality: 28 },
  { stage: "Price", velocity: 51, quality: 42 },
  { stage: "Approve", velocity: 67, quality: 58 },
];

const chartConfig = {
  velocity: { label: "Velocity", color: "hsl(var(--primary))" },
  quality: { label: "Confidence", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const tableData: DealRow[] = [
  { account: "Northwind Health", owner: "Ava", stage: "Proposal", value: "$84k" },
  { account: "Highline Energy", owner: "Milo", stage: "Review", value: "$126k" },
  { account: "Sunset Transit", owner: "Rhea", stage: "Discovery", value: "$52k" },
  { account: "Axis Retail", owner: "Jin", stage: "Approved", value: "$194k" },
];

const columns: ColumnDef<DealRow>[] = [
  { accessorKey: "account", header: "Account" },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "stage", header: "Stage" },
  { accessorKey: "value", header: "Value" },
];

const formSchema = z.object({
  company: z.string().min(2, "Use at least 2 characters."),
  contact: z.string().email("Enter a valid email."),
  notes: z.string().min(10, "Add more context."),
  priority: z.enum(["standard", "expedite"]),
});

type FormValues = z.infer<typeof formSchema>;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section className="space-y-5 border-t border-border/80 pt-8 first:border-t-0 first:pt-0">
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ShowcaseCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={cn("min-w-0 space-y-4", className)}>
      <div className="space-y-1.5">
        <h3 className="text-base font-medium tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function DataTableDemo(): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell
                      ? flexRender(cell.column.columnDef.cell, cell.getContext())
                      : (cell.getValue() as string)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Route-level data table demo using TanStack Table plus the shared `Table` primitive.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(): void => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(): void => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarPreview(): ReactElement {
  const items = [
    { icon: Layers3Icon, label: "Workflows" },
    { icon: BellIcon, label: "Activity" },
    { icon: Settings2Icon, label: "Settings" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-sidebar text-sidebar-foreground">
      <SidebarProvider
        defaultOpen
        className="min-h-0 flex-col overflow-hidden [--sidebar-width:17rem] md:h-80 md:flex-row"
      >
        <Sidebar
          collapsible="none"
          className="w-full shrink-0 border-b border-sidebar-border md:h-full md:w-(--sidebar-width) md:border-b-0 md:border-r"
        >
          <SidebarHeader className="justify-center px-4 py-4 md:min-h-28">
            <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/70 px-4 py-3 text-sm font-semibold text-sidebar-accent-foreground">
              <Layers3Icon className="size-5 shrink-0" />
              <span>Component Lab</span>
            </div>
          </SidebarHeader>
          <SidebarSeparator className="mx-0" />
          <SidebarContent className="px-3 py-3">
            <SidebarGroup className="gap-2 px-0">
              <SidebarGroupLabel className="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/60">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ icon: Icon, label }, index) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={index === 0}
                        className="h-10 rounded-lg px-3 text-base"
                      >
                        <Icon className="size-5" />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-w-0 bg-background">
          <div className="flex flex-col justify-center border-b border-border px-5 py-4 md:min-h-28">
            <div className="text-lg font-semibold">Inset preview</div>
            <p className="mt-1 text-sm text-muted-foreground">
              The shared sidebar primitives used by the main shell are also exposed here.
            </p>
          </div>
          <div className="grid gap-3 p-5 text-sm text-muted-foreground xl:grid-cols-2">
            <div className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-4">
              Desktop shell collapse behavior is exercised through the real app sidebar toggle in
              the header.
            </div>
            <div className="rounded-lg border border-border/70 bg-card px-4 py-4">
              Direction switching is covered separately below so this preview can stay layout-stable
              across widths.
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function DirectionDemo(): ReactElement {
  const { dir, setDir } = useDirection();

  return (
    <div dir={dir} className="space-y-3 rounded-xl border border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Direction provider</div>
          <div className="text-sm text-muted-foreground">Current mode: {dir.toUpperCase()}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(): void => setDir((current) => (current === "ltr" ? "rtl" : "ltr"))}
        >
          Toggle Direction
        </Button>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 text-sm">
        <Badge variant="secondary">Lead</Badge>
        <span>Direction-sensitive row content</span>
        <Kbd className="ml-auto">Tab</Kbd>
      </div>
    </div>
  );
}

export default function Demo(): ReactElement {
  const [commandOpen, setCommandOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(new Date());
  const [comboboxValue, setComboboxValue] = useState("proposal");
  const [progressValue, setProgressValue] = useState(58);
  const [otpValue, setOtpValue] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "Northwind Health",
      contact: "ops@northwind.example",
      notes: "Need final pricing review before Friday.",
      priority: "standard",
    },
  });

  const onSubmit = (values: FormValues): void => {
    sonnerToast.success("Form submitted", {
      description: `${values.company} updated for ${values.priority} review.`,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-12 pb-12">
        <section className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Component Reference</h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Shipped shadcn primitives and local wrappers for this template. Keep this page as a
              reference surface only, then remove it before real implementation work starts.
            </p>
          </div>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>Client-only SPA</span>
              <span className="hidden text-border sm:inline">/</span>
              <span>Radix aggregate package</span>
              <span className="hidden text-border sm:inline">/</span>
              <span>Interactive QA target</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 xl:w-auto">
              <Button variant="outline" onClick={(): void => setCommandOpen(true)}>
                Open Command
              </Button>
              <Button
                variant="outline"
                onClick={(): void => {
                  sonnerToast.success("Sonner notification", {
                    description: "Global toast wiring is active.",
                  });
                }}
              >
                Trigger Sonner
              </Button>
              <Button
                variant="outline"
                onClick={(): void => {
                  legacyToast({
                    title: "Legacy toast",
                    description: "Hook-based Radix toast is still mounted.",
                    action: <ToastAction altText="Dismiss">Undo</ToastAction>,
                  });
                }}
              >
                Trigger Legacy Toast
              </Button>
            </div>
          </div>
        </section>

        <Section
          title="Identity and Typography"
          description="Foundational content patterns and low-level display primitives."
        >
          <div className="grid items-start gap-x-6 gap-y-10 xl:grid-cols-2">
            <ShowcaseCard
              title="Badges, avatars, breadcrumbs"
              description="Compact identity treatments."
            >
              <div className="space-y-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Workspace</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Catalog</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  Direct separator coverage for the base primitive.
                </div>
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="Typography" description="Route-level shadcn typography treatment.">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-tight">
                  Intentional, readable documentation blocks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Typography is not shipped as a primitive, so this demo keeps it as route-level
                  content styling rather than a forced reusable component.
                </p>
                <blockquote className="border-l-2 border-border pl-4 text-sm text-muted-foreground">
                  Keep structural styles reusable, and keep document voice local to the screen that
                  needs it.
                </blockquote>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Aspect ratio and empty state"
              description="Media framing and no-data surfaces."
            >
              <div className="space-y-4">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    16:9 preview
                  </div>
                </AspectRatio>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia>
                      <SparklesIcon className="size-5" />
                    </EmptyMedia>
                    <EmptyTitle>No configured widgets</EmptyTitle>
                    <EmptyDescription>
                      Add layout blocks or seed sample data to preview the workspace shell.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button
                      size="sm"
                      onClick={(): void => {
                        sonnerToast.success("Block added", {
                          description: "Sample empty-state action is wired for QA.",
                        });
                      }}
                    >
                      Add block
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(): void => {
                        sonnerToast.success("Sample imported", {
                          description: "The empty-state secondary action is interactive too.",
                        });
                      }}
                    >
                      Import sample
                    </Button>
                  </EmptyContent>
                </Empty>
              </div>
            </ShowcaseCard>
          </div>
        </Section>

        <Section
          title="Actions and Inputs"
          description="Buttons, toggles, fields, structured forms, and common entry patterns."
        >
          <div className="grid items-start gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            <ShowcaseCard
              title="Buttons and toggles"
              description="Stateful controls and keyboard hinting."
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                </div>
                <ButtonGroup>
                  <Button variant="ghost" size="sm">
                    Save
                  </Button>
                  <ButtonGroupSeparator />
                  <ButtonGroupText>Ctrl</ButtonGroupText>
                  <Kbd>S</Kbd>
                </ButtonGroup>
                <div className="flex flex-wrap items-center gap-3">
                  <Toggle aria-label="Toggle pin">
                    <SparklesIcon />
                  </Toggle>
                  <ToggleGroup type="single" defaultValue="week">
                    <ToggleGroupItem value="day">Day</ToggleGroupItem>
                    <ToggleGroupItem value="week">Week</ToggleGroupItem>
                    <ToggleGroupItem value="month">Month</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Choice controls"
              description="Checkbox, radio, switch, slider, and progress."
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox defaultChecked id="alerts" />
                  <Label htmlFor="alerts">Alert routing enabled</Label>
                </div>
                <RadioGroup defaultValue="proposal">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="proposal" id="proposal" />
                    <Label htmlFor="proposal">Proposal</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="review" id="review" />
                    <Label htmlFor="review">Review</Label>
                  </div>
                </RadioGroup>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-approve under threshold</span>
                  <Switch defaultChecked />
                </div>
                <Slider
                  value={[progressValue]}
                  onValueChange={(values): void => setProgressValue(values[0] ?? 0)}
                  max={100}
                  step={1}
                />
                <Progress value={progressValue} />
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Inputs and composed fields"
              description="Structured entry patterns and mobile-safe native inputs."
            >
              <div className="space-y-4">
                <Input placeholder="Quote title" />
                <Textarea placeholder="Context for reviewers" />
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search accounts" />
                  <InputGroupButton>Go</InputGroupButton>
                </InputGroup>
                <NativeSelect
                  defaultValue="review"
                  options={[
                    { label: "Discovery", value: "discovery" },
                    { label: "Review", value: "review" },
                    { label: "Approved", value: "approved" },
                  ]}
                />
                <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </ShowcaseCard>
          </div>
          <div className="grid items-start gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            <ShowcaseCard
              title="Select, combobox, date picker"
              description="Decision controls built on the shared primitives."
            >
              <div className="space-y-4">
                <Select
                  value="ops"
                  options={[
                    { label: "Operations", value: "ops" },
                    { label: "Finance", value: "finance" },
                    { label: "Executive", value: "executive" },
                  ]}
                />
                <Combobox
                  value={comboboxValue}
                  onChange={setComboboxValue}
                  options={[
                    { label: "Proposal", value: "proposal" },
                    { label: "Review", value: "review" },
                    { label: "Approved", value: "approved" },
                  ]}
                />
                <DatePicker value={dateValue} onChange={setDateValue} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>
                      <PopoverTitle>Context panel</PopoverTitle>
                      <PopoverDescription>
                        Compact summaries, helper content, and small utility forms.
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Field and item helpers"
              description="Support components for dense settings screens."
            >
              <div className="space-y-4">
                <FieldSet>
                  <FieldTitle>Approval settings</FieldTitle>
                  <FieldDescription>
                    Keep low-level layout primitives reusable instead of burying them in route code.
                  </FieldDescription>
                  <FieldSeparator />
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Billing code</FieldLabel>
                      <FieldContent>
                        <Input placeholder="NW-4451" />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Internal notes</FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupTextarea defaultValue="Escalate only if margin drops below threshold." />
                        </InputGroup>
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Item>
                  <ItemMedia>
                    <CreditCardIcon className="size-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemHeader>
                      <ItemTitle>Billing profile</ItemTitle>
                      <ItemActions>
                        <Badge variant="secondary">Saved</Badge>
                      </ItemActions>
                    </ItemHeader>
                    <ItemDescription>
                      Ends in 4421 and is used for preview purchases.
                    </ItemDescription>
                    <ItemFooter>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </ItemFooter>
                  </ItemContent>
                </Item>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="React Hook Form"
              description="Form wrapper plus validation messaging."
            >
              <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>Account receiving the updated quote.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-2 sm:grid-cols-2"
                          >
                            <label className="flex items-center gap-3 rounded-lg border border-border px-3 py-3">
                              <RadioGroupItem value="standard" />
                              <div>
                                <div className="text-sm font-medium">Standard</div>
                                <div className="text-xs text-muted-foreground">
                                  Normal review lane
                                </div>
                              </div>
                            </label>
                            <label className="flex items-center gap-3 rounded-lg border border-border px-3 py-3">
                              <RadioGroupItem value="expedite" />
                              <div>
                                <div className="text-sm font-medium">Expedite</div>
                                <div className="text-xs text-muted-foreground">
                                  Move to the front of the queue
                                </div>
                              </div>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </ShowcaseCard>
          </div>
        </Section>

        <Section
          title="Overlay and Navigation"
          description="Menus, dialogs, drawers, hover surfaces, and command patterns."
        >
          <div className="grid items-start gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            <ShowcaseCard
              title="Menus"
              description="Dropdown, context menu, menubar, and navigation menu."
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-9 items-center rounded-md border border-dashed border-border px-3 text-sm text-muted-foreground">
                      Right click
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Assign owner</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem>Export row</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New quote</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Export</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Compact density</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-2 p-4 md:w-[360px]">
                          <li>
                            <NavigationMenuLink className="block rounded-lg p-3 hover:bg-accent">
                              Workflow shells, navigation patterns, and catalog demos.
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Dialog stack"
              description="Modal, sheet, drawer, and confirmation surfaces."
            >
              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Publish updates</DialogTitle>
                      <DialogDescription>
                        Review staged workspace changes before publishing.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Publish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Workspace panel</SheetTitle>
                      <SheetDescription>
                        Secondary controls without leaving the page.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Mobile-ready actions</DrawerTitle>
                      <DrawerDescription>
                        Vaul-based drawer for touch-first flows.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Continue</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Alert Dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete draft quote?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Command, tooltip, hover card"
              description="Fast navigation and contextual helper surfaces."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" onClick={(): void => setCommandOpen(true)}>
                  <CommandIcon className="mr-2 size-4" />
                  Command Palette
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>Hover-only hint</TooltipContent>
                </Tooltip>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">Hover Card</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-1">
                      <div className="font-medium">Northwind Health</div>
                      <div className="text-sm text-muted-foreground">
                        High-value renewal currently in pricing review.
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </ShowcaseCard>
          </div>
        </Section>

        <Section
          title="Layout and Data"
          description="Disclosure patterns, scrolling, resizing, tables, charts, and client-only shell previews."
        >
          <div className="grid gap-4">
            <ShowcaseCard
              title="Accordion, collapsible, tabs"
              description="Progressive disclosure for dense screens."
            >
              <div className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Quote summary</AccordionTrigger>
                    <AccordionContent>
                      Three approvals pending, margin stable, and no blocking validation errors.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      Toggle details
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
                    Collapsible content is useful when a full accordion feels too heavy.
                  </CollapsibleContent>
                </Collapsible>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="text-sm text-muted-foreground">
                    Overview panel content.
                  </TabsContent>
                  <TabsContent value="history" className="text-sm text-muted-foreground">
                    History panel content.
                  </TabsContent>
                </Tabs>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Scroll area and resizable panels"
              description="Viewport-bound containers and pane resizing."
            >
              <div className="space-y-4">
                <ScrollArea className="h-40 rounded-xl border border-border p-4">
                  <div className="space-y-3 text-sm">
                    {Array.from({ length: 8 }, (_, index) => `Row ${index + 1}`).map((rowLabel) => (
                      <div key={rowLabel} className="rounded-lg bg-muted/60 p-3">
                        {rowLabel} inside the scroll area.
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="h-52 overflow-hidden rounded-xl border border-border">
                  <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel defaultSize={55}>
                      <div className="flex h-full items-center justify-center bg-muted/30 text-sm text-muted-foreground">
                        Pipeline board
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={45}>
                      <div className="flex h-full items-center justify-center bg-card text-sm text-muted-foreground">
                        Inspector
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Sidebar and direction"
              description="Shell preview and RTL/LTR coverage."
            >
              <div className="space-y-4">
                <SidebarPreview />
                <DirectionProvider>
                  <DirectionDemo />
                </DirectionProvider>
              </div>
            </ShowcaseCard>
          </div>
          <div className="grid gap-4">
            <ShowcaseCard
              title="Table and data table"
              description="Shared primitive plus route-level table composition."
            >
              <div className="space-y-6">
                <div className="overflow-x-auto rounded-xl border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Step</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Discovery</TableCell>
                        <TableCell>Ava</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pricing</TableCell>
                        <TableCell>Rhea</TableCell>
                        <TableCell>
                          <Badge variant="outline">Queued</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <DataTableDemo />
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="Chart and carousel" description="Data and media presentation.">
              <div className="space-y-6">
                <ChartContainer config={chartConfig} className="h-[320px] min-w-0 w-full">
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="stage" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="velocity"
                      fill="var(--color-velocity)"
                      radius={6}
                      isAnimationActive={false}
                    />
                    <Bar
                      dataKey="quality"
                      fill="var(--color-quality)"
                      radius={6}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ChartContainer>
                <div className="mx-auto w-full max-w-3xl space-y-6">
                  <Carousel opts={{ loop: true }}>
                    <CarouselContent>
                      {["Proposal", "Review", "Approval"].map((label) => (
                        <CarouselItem key={label}>
                          <div className="rounded-xl border border-border bg-muted/40 p-8 text-center text-sm font-medium">
                            {label} slide
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#pagination" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pagination" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pagination">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#pagination" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </ShowcaseCard>
          </div>
        </Section>

        <Section
          title="Feedback and Utilities"
          description="Alerts, loading states, notifications, and compact helper components."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <ShowcaseCard
              title="Alerts and loading"
              description="Status, empty, skeleton, and spinner states."
              className="xl:col-span-2"
            >
              <div className="space-y-4">
                <Alert variant="success" title="Catalog synced">
                  All intended components are wired into the client-only template.
                </Alert>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 flex-1" />
                  <Spinner className="size-5" />
                </div>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Calendar and utilities"
              description="Direct calendar surface plus keyboard hints."
            >
              <div className="max-w-sm space-y-4">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={setDateValue}
                  className="rounded-xl border border-border"
                />
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Notifications"
              description="Sonner and legacy toast coverage is triggered from the hero actions."
            >
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Use the buttons above to trigger both notification stacks.</p>
                <div className="flex items-center gap-2">
                  <TablePropertiesIcon className="size-4" />
                  <span>Legacy Radix toast stays available for compatibility.</span>
                </div>
                <div className="flex items-center gap-2">
                  <WandSparklesIcon className="size-4" />
                  <span>Sonner is the preferred stack for new work.</span>
                </div>
              </div>
            </ShowcaseCard>
          </div>
        </Section>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={(): void => setCommandOpen(false)}>
              Open review board
            </CommandItem>
            <CommandItem onSelect={(): void => setCommandOpen(false)}>Export pipeline</CommandItem>
            <CommandItem onSelect={(): void => setCommandOpen(false)}>Toggle density</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}
