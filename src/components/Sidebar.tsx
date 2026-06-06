import { CatData } from '../data/cats';
import { X, Calendar, Info } from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  cat: CatData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelative: (id: string) => void;
  allCats: CatData[];
}

export function Sidebar({ cat, isOpen, onClose, onSelectRelative, allCats }: SidebarProps) {
  if (!cat) return null;

  const parents = allCats.filter(c => cat.parents?.includes(c.id));
  const children = allCats.filter(c => c.parents?.includes(cat.id));
  // Simple sibling calculation: share at least one parent
  const siblings = allCats.filter(c => 
    c.id !== cat.id && 
    c.parents?.some(p => cat.parents?.includes(p))
  );

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed z-50 bg-slate-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col",
          // Mobile: Bottom Sheet
          "bottom-0 left-0 right-0 h-[80vh] rounded-t-3xl border-t border-slate-800",
          // Desktop: Right Sidebar
          "md:top-0 md:bottom-auto md:right-0 md:left-auto md:h-screen md:w-[400px] md:rounded-none md:border-l md:border-t-0 md:border-slate-800",
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"
        )}
      >
        {/* Header/Drag Handle */}
        <div className="flex-shrink-0 p-4 pb-2 relative">
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 md:hidden" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 transition-colors md:top-6 md:right-6"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-0 md:p-8 md:pt-12">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
             <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-sm border border-slate-700 overflow-hidden">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${cat.name}&backgroundColor=334155,475569&textColor=e2e8f0`} alt={cat.name} className="w-full h-full object-cover" />
                )}
             </div>
             <h2 className="text-3xl font-bold text-slate-100 mb-1">{cat.name}</h2>
             <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Generation {cat.generation}</p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> About
              </h3>
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 text-slate-300 leading-relaxed">
                <p><strong className="text-slate-200">Color/Trait:</strong> {cat.color || 'Not specified'}</p>
                <p className="mt-2"><strong className="text-slate-200">Notes:</strong> {cat.description}</p>
              </div>
            </section>

            {/* Relatives */}
            <section>
               <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Relatives
              </h3>
              <div className="space-y-3">
                {parents.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Parents</p>
                    <div className="flex flex-wrap gap-2">
                      {parents.map(p => (
                        <button key={p.id} onClick={() => onSelectRelative(p.id)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-primary hover:text-primary transition-colors">
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {siblings.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Siblings</p>
                    <div className="flex flex-wrap gap-2">
                      {siblings.map(p => (
                        <button key={p.id} onClick={() => onSelectRelative(p.id)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-primary hover:text-primary transition-colors">
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {children.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Children</p>
                    <div className="flex flex-wrap gap-2">
                      {children.map(p => (
                        <button key={p.id} onClick={() => onSelectRelative(p.id)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-primary hover:text-primary transition-colors">
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {parents.length === 0 && children.length === 0 && siblings.length === 0 && (
                  <p className="text-sm text-slate-500 italic">No relatives known.</p>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
