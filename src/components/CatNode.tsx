import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { CatData } from '../data/cats';
import { cn } from '../utils/cn';
import { Cat, Ghost, Heart, Search } from 'lucide-react';

interface CatNodeProps {
  data: {
    cat: CatData;
    isSelected: boolean;
  };
  targetPosition?: Position;
  sourcePosition?: Position;
}

const statusColors = {
  alive: 'bg-green-100 text-green-700 border-green-200',
  dead: 'bg-slate-100 text-slate-700 border-slate-200',
  lost: 'bg-amber-100 text-amber-700 border-amber-200',
  adopted: 'bg-blue-100 text-blue-700 border-blue-200',
};

const statusIcons = {
  alive: <Heart className="w-3 h-3" />,
  dead: <Ghost className="w-3 h-3" />,
  lost: <Search className="w-3 h-3" />,
  adopted: <Cat className="w-3 h-3" />,
};

const CatNode = ({ data, targetPosition = Position.Top, sourcePosition = Position.Bottom }: CatNodeProps) => {
  const { cat, isSelected } = data;

  return (
    <div
      className={cn(
        "relative w-[220px] rounded-2xl border-2 bg-slate-800/90 backdrop-blur-md p-4 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer",
        isSelected ? "border-primary shadow-xl scale-105" : "border-slate-700"
      )}
    >
      <Handle
        type="target"
        position={targetPosition}
        className="w-3 h-3 border-2 border-slate-800 bg-slate-400"
      />
      
      <div className="flex flex-col items-center gap-2">
        {/* Avatar Placeholder */}
        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-800 shadow-md overflow-hidden">
          {cat.image ? (
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
          ) : (
            <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${cat.name}&backgroundColor=334155,475569&textColor=e2e8f0`} alt={cat.name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="font-semibold text-slate-100 text-lg leading-tight">{cat.name}</h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Gen {cat.generation}</p>
        </div>

        {/* Status Badge */}
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
          statusColors[cat.status]
        )}>
          {statusIcons[cat.status]}
          <span className="capitalize">{cat.status}</span>
        </div>
      </div>

      <Handle
        type="source"
        position={sourcePosition}
        className="w-3 h-3 border-2 border-slate-800 bg-slate-400"
      />
    </div>
  );
};

export default memo(CatNode);
