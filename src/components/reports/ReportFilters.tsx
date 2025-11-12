
import React from 'react';
import { DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ReportFiltersProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  spaceType: string;
  setSpaceType: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  reportType: string;
  setReportType: React.Dispatch<React.SetStateAction<string>>;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  date,
  setDate,
  spaceType,
  setSpaceType,
  status,
  setStatus,
  reportType,
  setReportType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Date Range Picker */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Choose a period</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(newDate: DateRange | undefined) => setDate(newDate)}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Space Type Filter */}
      <Select
        value={spaceType}
        onValueChange={setSpaceType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Space Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Spaces</SelectItem>
          <SelectItem value="desk">Desks</SelectItem>
          <SelectItem value="room">Meeting Rooms</SelectItem>
          <SelectItem value="office">Private Offices</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>

      {/* Report Type Selector */}
      <Select
        value={reportType}
        onValueChange={setReportType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Report Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overview">Overview</SelectItem>
          <SelectItem value="status">By Status</SelectItem>
          <SelectItem value="space">By Space</SelectItem>
          <SelectItem value="trend">Trend Analysis</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportFilters;
