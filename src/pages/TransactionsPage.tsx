import React, { useState, useMemo } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import CustomButton from "@/components/ui/CustomButton";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";

interface Transaction {
  id: string;
  transactionId: string;
  description: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  status: "pending" | "completed" | "failed";
  date: string;
  customer: string;
  method:
    | "cash"
    | "creditCard"
    | "debitCard"
    | "bankTransfer"
    | "paypal"
    | "crypto";
  category: string;
}

// Column definitions for the data table - optimized function
const createColumns = (t: any): ColumnDef<Transaction>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 h-auto font-medium"
      >
        {t.transactions.transactionId}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("transactionId")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 h-auto font-medium"
      >
        {t.transactions.description}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 h-auto font-medium justify-end"
      >
        {t.transactions.amount}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const transaction = row.original;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium">
          <span
            className={
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }
          >
            {formatted}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: t.transactions.type,
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const typeConfig = {
        income: {
          label: t.transactions.types.income,
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: TrendingUp,
        },
        expense: {
          label: t.transactions.types.expense,
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: TrendingDown,
        },
        transfer: {
          label: t.transactions.types.transfer,
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          icon: ArrowUpDown,
        },
      };
      const config = typeConfig[type as keyof typeof typeConfig];
      const Icon = config.icon;

      return (
        <Badge
          variant="secondary"
          className={`${config.color} border-0 font-medium px-2.5 py-0.5`}
        >
          <Icon className="mr-1.5 h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: t.transactions.status,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig = {
        completed: {
          label: t.transactions.statuses.completed,
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: CheckCircle,
        },
        pending: {
          label: t.transactions.statuses.pending,
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          icon: Clock,
        },
        failed: {
          label: t.transactions.statuses.failed,
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: XCircle,
        },
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      const Icon = config.icon;

      return (
        <Badge
          variant="secondary"
          className={`${config.color} border-0 font-medium px-2.5 py-0.5`}
        >
          <Icon className="mr-1.5 h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "method",
    header: t.transactions.method,
    cell: ({ row }) => {
      const method = row.getValue("method") as string;
      const methodLabels = {
        cash: t.transactions.paymentMethods.cash,
        creditCard: t.transactions.paymentMethods.creditCard,
        debitCard: t.transactions.paymentMethods.debitCard,
        bankTransfer: t.transactions.paymentMethods.bankTransfer,
        paypal: t.transactions.paymentMethods.paypal,
        crypto: t.transactions.paymentMethods.crypto,
      };

      return (
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800">
            <CreditCard className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-sm font-medium">
            {methodLabels[method as keyof typeof methodLabels]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 h-auto font-medium"
      >
        {t.transactions.date}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="whitespace-nowrap">{date.toLocaleDateString()}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {t.transactions.actions.title}
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.transactionId)
              }
            >
              {t.transactions.actions.copyId}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              {t.transactions.actions.view}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              {t.transactions.actions.edit}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              {t.transactions.actions.delete}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Sample transaction data - moved outside component to prevent recreation
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN001",
    description: "Payment from John Doe",
    amount: 1250.0,
    type: "income",
    status: "completed",
    date: "2024-10-04",
    customer: "John Doe",
    method: "creditCard",
    category: "Sales",
  },
  {
    id: "2",
    transactionId: "TXN002",
    description: "Office supplies purchase",
    amount: 89.99,
    type: "expense",
    status: "completed",
    date: "2024-10-03",
    customer: "Office Depot",
    method: "debitCard",
    category: "Office",
  },
  {
    id: "3",
    transactionId: "TXN003",
    description: "Freelance project payment",
    amount: 750.0,
    type: "income",
    status: "pending",
    date: "2024-10-03",
    customer: "ABC Company",
    method: "bankTransfer",
    category: "Services",
  },
  {
    id: "4",
    transactionId: "TXN004",
    description: "Marketing campaign",
    amount: 299.99,
    type: "expense",
    status: "completed",
    date: "2024-10-02",
    customer: "AdWords",
    method: "creditCard",
    category: "Marketing",
  },
  {
    id: "5",
    transactionId: "TXN005",
    description: "Product sale",
    amount: 45.0,
    type: "income",
    status: "completed",
    date: "2024-10-02",
    customer: "Jane Smith",
    method: "paypal",
    category: "Sales",
  },
  {
    id: "6",
    transactionId: "TXN006",
    description: "Software subscription",
    amount: 19.99,
    type: "expense",
    status: "failed",
    date: "2024-10-01",
    customer: "SaaS Provider",
    method: "creditCard",
    category: "Software",
  },
  {
    id: "7",
    transactionId: "TXN007",
    description: "Consulting fees",
    amount: 500.0,
    type: "income",
    status: "completed",
    date: "2024-09-30",
    customer: "Consulting Client",
    method: "bankTransfer",
    category: "Consulting",
  },
  {
    id: "8",
    transactionId: "TXN008",
    description: "Equipment purchase",
    amount: 1299.0,
    type: "expense",
    status: "completed",
    date: "2024-09-29",
    customer: "Tech Store",
    method: "creditCard",
    category: "Equipment",
  },
  {
    id: "9",
    transactionId: "TXN009",
    description: "Client payment",
    amount: 2000.0,
    type: "income",
    status: "pending",
    date: "2024-09-28",
    customer: "Premium Client",
    method: "bankTransfer",
    category: "Services",
  },
  {
    id: "10",
    transactionId: "TXN010",
    description: "Travel expenses",
    amount: 450.0,
    type: "expense",
    status: "completed",
    date: "2024-09-27",
    customer: "Travel Agency",
    method: "debitCard",
    category: "Travel",
  },
  {
    id: "11",
    transactionId: "TXN011",
    description: "Product licensing",
    amount: 150.0,
    type: "income",
    status: "completed",
    date: "2024-09-26",
    customer: "License Buyer",
    method: "paypal",
    category: "Licensing",
  },
  {
    id: "12",
    transactionId: "TXN012",
    description: "Utility bills",
    amount: 125.5,
    type: "expense",
    status: "completed",
    date: "2024-09-25",
    customer: "Utility Company",
    method: "bankTransfer",
    category: "Utilities",
  },
  {
    id: "13",
    transactionId: "TXN013",
    description: "Workshop payment",
    amount: 350.0,
    type: "income",
    status: "completed",
    date: "2024-09-24",
    customer: "Workshop Attendee",
    method: "creditCard",
    category: "Education",
  },
  {
    id: "14",
    transactionId: "TXN014",
    description: "Domain renewal",
    amount: 12.99,
    type: "expense",
    status: "failed",
    date: "2024-09-23",
    customer: "Domain Provider",
    method: "creditCard",
    category: "Website",
  },
  {
    id: "15",
    transactionId: "TXN015",
    description: "Affiliate commission",
    amount: 85.0,
    type: "income",
    status: "completed",
    date: "2024-09-22",
    customer: "Affiliate Network",
    method: "paypal",
    category: "Affiliate",
  },
  {
    id: "16",
    transactionId: "TXN016",
    description: "Cloud storage",
    amount: 9.99,
    type: "expense",
    status: "completed",
    date: "2024-09-21",
    customer: "Cloud Provider",
    method: "creditCard",
    category: "Storage",
  },
  {
    id: "17",
    transactionId: "TXN017",
    description: "Design project",
    amount: 600.0,
    type: "income",
    status: "pending",
    date: "2024-09-20",
    customer: "Design Client",
    method: "bankTransfer",
    category: "Design",
  },
  {
    id: "18",
    transactionId: "TXN018",
    description: "Phone bill",
    amount: 55.0,
    type: "expense",
    status: "completed",
    date: "2024-09-19",
    customer: "Telecom Company",
    method: "debitCard",
    category: "Communication",
  },
  {
    id: "19",
    transactionId: "TXN019",
    description: "E-book sales",
    amount: 29.99,
    type: "income",
    status: "completed",
    date: "2024-09-18",
    customer: "E-book Customer",
    method: "paypal",
    category: "Publishing",
  },
  {
    id: "20",
    transactionId: "TXN020",
    description: "Insurance premium",
    amount: 200.0,
    type: "expense",
    status: "completed",
    date: "2024-09-17",
    customer: "Insurance Company",
    method: "bankTransfer",
    category: "Insurance",
  },
  {
    id: "21",
    transactionId: "TXN021",
    description: "Cryptocurrency investment",
    amount: 1500.0,
    type: "expense",
    status: "completed",
    date: "2024-09-16",
    customer: "Crypto Exchange",
    method: "crypto",
    category: "Investment",
  },
  {
    id: "22",
    transactionId: "TXN022",
    description: "Dividend payment",
    amount: 120.0,
    type: "income",
    status: "completed",
    date: "2024-09-15",
    customer: "Investment Broker",
    method: "bankTransfer",
    category: "Investment",
  },
  {
    id: "23",
    transactionId: "TXN023",
    description: "Office rent",
    amount: 800.0,
    type: "expense",
    status: "pending",
    date: "2024-09-14",
    customer: "Property Manager",
    method: "bankTransfer",
    category: "Rent",
  },
  {
    id: "24",
    transactionId: "TXN024",
    description: "Course completion bonus",
    amount: 250.0,
    type: "income",
    status: "completed",
    date: "2024-09-13",
    customer: "Education Platform",
    method: "paypal",
    category: "Education",
  },
  {
    id: "25",
    transactionId: "TXN025",
    description: "Charity donation",
    amount: 100.0,
    type: "expense",
    status: "completed",
    date: "2024-09-12",
    customer: "Charity Organization",
    method: "creditCard",
    category: "Charity",
  },
];

const TransactionsPage: React.FC = React.memo(() => {
  const { t } = useLanguage();

  // Loading state for initial render
  const [isLoading, setIsLoading] = React.useState(true);

  // Debug log to monitor renders
  React.useEffect(() => {
    console.log("TransactionsPage rendered");
    setIsLoading(false);
  }, []);

  // React Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Button loading states
  const exportLoading = useButtonLoading();
  const importLoading = useButtonLoading();
  const addTransactionLoading = useButtonLoading();

  // Create columns using the translation function - memoized properly with stable dependency
  const columns = useMemo(
    () => createColumns(t),
    [JSON.stringify(t.transactions)]
  );

  // Create table instance - properly using useReactTable hook
  const table = useReactTable({
    data: SAMPLE_TRANSACTIONS,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Statistics calculations - optimized to prevent infinite rerenders
  const stats = useMemo(() => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    return {
      totalTransactions: filteredData.length,
      totalIncome: filteredData
        .filter((t) => t.type === "income" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpenses: filteredData
        .filter((t) => t.type === "expense" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0),
      pendingAmount: filteredData
        .filter((t) => t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0),
    };
  }, [table.getFilteredRowModel().rows]);

  const handleClearFilters = React.useCallback(() => {
    table.getColumn("description")?.setFilterValue("");
    table.getColumn("status")?.setFilterValue("");
    table.getColumn("type")?.setFilterValue("");
  }, [table]);

  // Show loading state during initial render to prevent freezing
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            {t.transactions.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            {t.transactions.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <CustomButton
            variant="outline"
            icon={Upload}
            loading={importLoading.loading}
            onClick={() =>
              importLoading.withLoading(
                () => new Promise((resolve) => setTimeout(resolve, 1000))
              )
            }
          >
            {t.transactions.importTransactions}
          </CustomButton>
          <CustomButton
            variant="outline"
            icon={Download}
            loading={exportLoading.loading}
            onClick={() =>
              exportLoading.withLoading(
                () => new Promise((resolve) => setTimeout(resolve, 1000))
              )
            }
          >
            {t.transactions.exportTransactions}
          </CustomButton>
          <CustomButton
            variant="primary"
            icon={Plus}
            loading={addTransactionLoading.loading}
            onClick={() =>
              addTransactionLoading.withLoading(
                () => new Promise((resolve) => setTimeout(resolve, 1000))
              )
            }
          >
            {t.transactions.addTransaction}
          </CustomButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {t.transactions.stats.totalTransactions}
            </CardTitle>
            <div className="p-2 rounded-full bg-blue-200 dark:bg-blue-800">
              <DollarSign className="h-4 w-4 text-blue-700 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {stats.totalTransactions}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {t.transactions.stats.allTimeTotal}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              {t.transactions.stats.totalIncome}
            </CardTitle>
            <div className="p-2 rounded-full bg-green-200 dark:bg-green-800">
              <TrendingUp className="h-4 w-4 text-green-700 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              ${stats.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              {t.transactions.stats.completedOnly}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
              {t.transactions.stats.totalExpenses}
            </CardTitle>
            <div className="p-2 rounded-full bg-red-200 dark:bg-red-800">
              <TrendingDown className="h-4 w-4 text-red-700 dark:text-red-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900 dark:text-red-100">
              ${stats.totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {t.transactions.stats.completedOnly}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {t.transactions.stats.pendingAmount}
            </CardTitle>
            <div className="p-2 rounded-full bg-yellow-200 dark:bg-yellow-800">
              <Clock className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
              ${stats.pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              {t.transactions.stats.awaitingProcessing}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {t.transactions.tableTitle}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Table Controls */}
          <div className="bg-gray-50 dark:bg-gray-800/50 -mx-6 -mt-6 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Input
                    placeholder={t.transactions.filters.searchPlaceholder}
                    value={
                      (table
                        .getColumn("description")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("description")
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-80 pl-4 pr-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {t.transactions.filters.clearAll}
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {t.transactions.filters.columns}{" "}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="font-semibold text-gray-900 dark:text-gray-100 py-4"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-32 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <CreditCard className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                          <p className="text-lg font-medium">
                            {t.transactions.noResults}
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 py-4 border-t border-gray-200 dark:border-gray-700 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {table.getFilteredSelectedRowModel().rows.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {table.getFilteredRowModel().rows.length}
                  </span>{" "}
                  row(s) selected
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rows per page
                  </p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page{" "}
                  <span className="text-gray-900 dark:text-gray-100">
                    {table.getState().pagination.pageIndex + 1}
                  </span>{" "}
                  of{" "}
                  <span className="text-gray-900 dark:text-gray-100">
                    {table.getPageCount()}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex h-8 w-8 p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    {"<<"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    {"<"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    {">"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex h-8 w-8 p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    {">>"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

TransactionsPage.displayName = "TransactionsPage";

export default TransactionsPage;
