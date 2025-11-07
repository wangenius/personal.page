import { Fragment } from 'react/jsx-runtime';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Controller, useFormContext } from 'react-hook-form';

interface SettingsItemProps {
  title: string;
  description: string;
  type: 'switch' | 'select';
  name: string;
  options?: { label: string; value: string }[];
  onChange?: (value: any) => void;
}

export default function SettingsItem({
  title,
  description,
  type,
  name,
  options,
  onChange,
}: SettingsItemProps) {
  const { control } = useFormContext();

  return (
    <div className="flex items-center gap-2 justify-between min-w-[250px]">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Fragment>
            {type === 'switch' && (
              <Switch
                checked={field.value}
                onCheckedChange={checked => {
                  field.onChange(checked);
                  onChange?.(checked);
                }}
              />
            )}
            {type === 'select' && (
              <Select
                value={field.value}
                onValueChange={value => {
                  field.onChange(value);
                  onChange?.(value);
                }}
              >
                <SelectTrigger className="h-8 w-24">
                  <SelectValue placeholder="选择" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Fragment>
        )}
      />
    </div>
  );
}
