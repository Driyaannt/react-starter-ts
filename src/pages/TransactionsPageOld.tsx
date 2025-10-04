import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Search,
  Filter,
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

// Column definitions for the data table
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
          color: "bg-green-100 text-green-800",
          icon: TrendingUp,
        },
        expense: {
          label: t.transactions.types.expense,
          color: "bg-red-100 text-red-800",
          icon: TrendingDown,
        },
        transfer: {
          label: t.transactions.types.transfer,
          color: "bg-blue-100 text-blue-800",
          icon: ArrowUpDown,
        },
      };
      const config = typeConfig[type as keyof typeof typeConfig];
      const Icon = config.icon;

      return (
        <Badge variant="secondary" className={`${config.color} border-0`}>
          <Icon className="mr-1 h-3 w-3" />
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
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
        },
        pending: {
          label: t.transactions.statuses.pending,
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
        },
        failed: {
          label: t.transactions.statuses.failed,
          color: "bg-red-100 text-red-800",
          icon: XCircle,
        },
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      const Icon = config.icon;

      return (
        <Badge variant="secondary" className={`${config.color} border-0`}>
          <Icon className="mr-1 h-3 w-3" />
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
        <div className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          {methodLabels[method as keyof typeof methodLabels]}
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

const TransactionsPage: React.FC = () => {
  const { t } = useLanguage();

  // React Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Button loading states
  const exportLoading = useButtonLoading();
  const importLoading = useButtonLoading();
  const addTransactionLoading = useButtonLoading();

  // Sample transaction data
  const transactions: Transaction[] = [
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
      amount: -450.75,
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
      description: "Transfer to savings",
      amount: -1000.0,
      type: "transfer",
      status: "pending",
      date: "2024-10-03",
      customer: "Savings Account",
      method: "bankTransfer",
      category: "Transfer",
    },
    {
      id: "4",
      transactionId: "TXN004",
      description: "Freelance project payment",
      amount: 2500.0,
      type: "income",
      status: "completed",
      date: "2024-10-02",
      customer: "Tech Corp",
      method: "paypal",
      category: "Freelance",
    },
    {
      id: "5",
      transactionId: "TXN005",
      description: "Marketing campaign",
      amount: -750.0,
      type: "expense",
      status: "failed",
      date: "2024-10-01",
      customer: "Google Ads",
      method: "creditCard",
      category: "Marketing",
    },
    {
      id: "6",
      transactionId: "TXN006",
      description: "Client consultation",
      amount: 800.0,
      type: "income",
      status: "completed",
      date: "2024-09-30",
      customer: "Jane Smith",
      method: "cash",
      category: "Consulting",
    },
  ];

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      // Date filtering
      let matchesDate = true;
      if (dateRange.from && dateRange.to) {
        const transactionDate = new Date(transaction.date);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        matchesDate = transactionDate >= fromDate && transactionDate <= toDate;
      }

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [searchTerm, statusFilter, typeFilter, dateRange, transactions]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalTransactions = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );
    const pendingTransactions = filteredTransactions.filter(
      (t) => t.status === "pending"
    ).length;
    const completedTransactions = filteredTransactions.filter(
      (t) => t.status === "completed"
    ).length;

    return {
      totalTransactions,
      totalAmount,
      pendingTransactions,
      completedTransactions,
    };
  }, [filteredTransactions]);

  // Utility functions
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "expense":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "transfer":
        return <ArrowUpDown className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));

    return (
      <span
        className={
          isPositive
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
      >
        {isPositive ? "+" : "-"}
        {formattedAmount}
      </span>
    );
  };

  const getPaymentMethodDisplay = (method: string) => {
    return (
      t.transactions.paymentMethod[
        method as keyof typeof t.transactions.paymentMethod
      ] || method
    );
  };

  // Event handlers
  const handleExport = async () => {
    await exportLoading.withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Export completed");
    });
  };

  const handleImport = async () => {
    await importLoading.withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Import completed");
    });
  };

  const handleAddTransaction = async () => {
    await addTransactionLoading.withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Transaction added");
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateRange({ from: "", to: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t.transactions.title}
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            {t.transactions.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <CustomButton
            variant="outline"
            icon={Download}
            loading={exportLoading.loading}
            onClick={handleExport}
          >
            {t.transactions.exportTransactions}
          </CustomButton>
          <CustomButton
            variant="outline"
            icon={Upload}
            loading={importLoading.loading}
            onClick={handleImport}
          >
            {t.transactions.importTransactions}
          </CustomButton>
          <CustomButton
            variant="primary"
            icon={Plus}
            loading={addTransactionLoading.loading}
            onClick={handleAddTransaction}
          >
            {t.transactions.addTransaction}
          </CustomButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              {t.transactions.totalTransactions}
            </CardTitle>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {stats.totalTransactions}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {t.dashboard.vsLastMonth}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              {t.transactions.totalAmount}
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              ${stats.totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">
              +12% {t.dashboard.vsLastMonth}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              {t.transactions.pendingTransactions}
            </CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {stats.pendingTransactions}
            </div>
            <p className="text-xs text-yellow-600 mt-1">
              -2% {t.dashboard.vsLastMonth}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">
              {t.transactions.completedTransactions}
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {stats.completedTransactions}
            </div>
            <p className="text-xs text-purple-600 mt-1">
              +8% {t.dashboard.vsLastMonth}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.common.filter} & {t.common.search}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              {t.common.search}
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder={t.transactions.searchTransactions}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {t.transactions.filterByStatus}
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500">
                  <SelectValue placeholder={t.transactions.allStatuses} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t.transactions.allStatuses}
                  </SelectItem>
                  <SelectItem value="pending">
                    {t.transactions.pending}
                  </SelectItem>
                  <SelectItem value="completed">
                    {t.transactions.completed}
                  </SelectItem>
                  <SelectItem value="failed">
                    {t.transactions.failed}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {t.transactions.filterByType}
              </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500">
                  <SelectValue placeholder={t.transactions.allTypes} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.transactions.allTypes}</SelectItem>
                  <SelectItem value="income">
                    {t.transactions.income}
                  </SelectItem>
                  <SelectItem value="expense">
                    {t.transactions.expense}
                  </SelectItem>
                  <SelectItem value="transfer">
                    {t.transactions.transfer}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {t.transactions.from}
              </Label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
                className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {t.transactions.to}
              </Label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
                className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-3">
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {t.transactions.reset}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.transactions.title} ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.transactionId}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.description}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.customer}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.type}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.amount}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.method}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.common.status}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    {t.transactions.date}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    {t.common.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-gray-500"
                    >
                      {t.transactions.noTransactions}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-blue-600">
                        {transaction.transactionId}
                      </TableCell>
                      <TableCell>
                        <div
                          className="max-w-[200px] truncate"
                          title={transaction.description}
                        >
                          {transaction.description}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.type)}
                          <span className="capitalize">
                            {transaction.type === "income"
                              ? t.transactions.income
                              : transaction.type === "expense"
                              ? t.transactions.expense
                              : t.transactions.transfer}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatAmount(transaction.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          {getPaymentMethodDisplay(transaction.method)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(transaction.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(transaction.status)}
                          {transaction.status === "pending"
                            ? t.transactions.pending
                            : transaction.status === "completed"
                            ? t.transactions.completed
                            : t.transactions.failed}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            side="bottom"
                            sideOffset={8}
                          >
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              {t.transactions.viewDetails}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              {t.transactions.editTransaction}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              {t.transactions.deleteTransaction}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
