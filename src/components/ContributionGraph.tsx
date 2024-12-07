"use client";
import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 表示无贡献，1-4 表示不同级别的贡献
}

function generateDummyData(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 10);
    let level: 0 | 1 | 2 | 3 | 4;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 4) level = 2;
    else if (count <= 6) level = 3;
    else level = 4;

    days.push({
      date: d.toISOString().split('T')[0],
      count,
      level,
    });
  }
  return days;
}

function getContributionColor(level: number, isDark: boolean = false) {
  // GitHub-like 配色
  if (isDark) {
    return {
      0: '#2d333b',
      1: '#0e4429',
      2: '#006d32',
      3: '#26a641',
      4: '#39d353',
    }[level];
  }
  return {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39',
  }[level];
}

export function ContributionGraph() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const weeks = Math.ceil(contributions.length / 7);

  useEffect(() => {
    setContributions(generateDummyData());
  }, []);

  const getMonthLabel = (weekIndex: number, dayIndex: number) => {
    const day = contributions[weekIndex * 7 + dayIndex];
    if (!day) return null;
    
    const date = new Date(day.date);
    const isFirstDayOfMonth = date.getDate() === 1;
    if (isFirstDayOfMonth) {
      return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    }
    return null;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex text-sm text-muted-foreground mb-2">
          <div className="w-8" /> {/* 空白占位，对齐日期标签 */}
          <div className="flex-1 flex justify-start space-x-12">
            {Array.from({ length: weeks }).map((_, weekIndex) => {
              const label = getMonthLabel(weekIndex, 0);
              if (!label) return <div key={weekIndex} />;
              return (
                <div key={weekIndex} className="text-xs">
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex text-xs">
          <div className="flex flex-col justify-around h-[120px] mr-2 text-muted-foreground">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className="flex-1 flex gap-[3px]">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = contributions[weekIndex * 7 + dayIndex];
                  if (!day) return null;
                  
                  return (
                    <div
                      key={dayIndex}
                      className="w-[10px] h-[10px] rounded-sm hover:ring-2 hover:ring-muted-foreground/20 transition-all"
                      style={{ backgroundColor: getContributionColor(day.level) }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end mt-4 text-sm text-muted-foreground gap-2">
          <span>Less</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-sm"
              style={{ backgroundColor: getContributionColor(i) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
} 