import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

/**
 * @typedef {Object} TrendProps
 * @property {number} value
 * @property {string} label
 * @property {boolean} isPositive
 */

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title
 * @property {string | number} value
 * @property {any} icon
 * @property {TrendProps} [trend]
 * @property {'default' | 'primary' | 'accent' | 'success' | 'warning'} [variant='default']
 */

/**
 * A reusable card component to display a statistic with an icon and optional trend data.
 * @param {StatsCardProps} props
 */
export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }) {
  const variantStyles = {
    default: 'bg-card border-border',
    primary: 'bg-gradient-primary text-primary-foreground border-primary/20',
    accent: 'bg-gradient-accent text-accent-foreground border-accent/20',
    success: 'bg-success/10 border-success/20 text-success-foreground',
    warning: 'bg-warning/10 border-warning/20 text-warning-foreground',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground/80',
    accent: 'text-accent-foreground/80',
    success: 'text-success',
    warning: 'text-warning',
  };

  return (
    <Card className={cn("shadow-soft hover:shadow-elegant transition-all duration-300", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === 'default' ? "text-muted-foreground" : "opacity-90"
            )}>
              {title}
            </p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                <span className={cn(
                  "font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className={cn(
                  variant === 'default' ? "text-muted-foreground" : "opacity-75"
                )}>
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            variant === 'default' ? "bg-primary/10" : "bg-white/20"
          )}>
            <Icon className={cn("w-6 h-6", iconStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
