import { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { cats } from './data/cats';
import { getLayoutedElements } from './utils/layout';
import CatNode from './components/CatNode';
import { Sidebar } from './components/Sidebar';

const nodeTypes = {
  catNode: CatNode,
};

function TreeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const { fitView, setCenter, getZoom } = useReactFlow();

  const selectedCat = useMemo(() => cats.find(c => c.id === selectedCatId) || null, [selectedCatId]);

  // Initialize nodes and edges from data
  useEffect(() => {
    const initialNodes: Node[] = cats.map(cat => ({
      id: cat.id,
      type: 'catNode',
      position: { x: 0, y: 0 },
      data: { cat, isSelected: false },
    }));

    const initialEdges: Edge[] = [];
    cats.forEach(cat => {
      if (cat.parents) {
        cat.parents.forEach(parentId => {
          initialEdges.push({
            id: `e-${parentId}-${cat.id}`,
            source: parentId,
            target: cat.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#475569', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#475569',
            },
          });
        });
      }
    });

    // Use Top-to-Bottom direction for all devices
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, 'TB');
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    
    // Custom responsive viewport logic for mobile
    window.requestAnimationFrame(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const topNode = layoutedNodes.find(n => n.id === 'perla') || layoutedNodes[0];
        if (topNode) {
          // Center on Perla, shifted slightly down so her kids are visible, at a readable zoom
          setCenter(topNode.position.x + 110, topNode.position.y + 200, { zoom: 0.8, duration: 800 });
        }
      }
    });
  }, [setNodes, setEdges, setCenter]);

  // Handle selection state on nodes
  useEffect(() => {
    setNodes(nds => 
      nds.map(node => ({
        ...node,
        data: {
          ...node.data,
          isSelected: node.id === selectedCatId
        }
      }))
    );
  }, [selectedCatId, setNodes]);

  const onNodeClick = useCallback((_event: any, node: Node) => {
    setSelectedCatId(node.id);
    
    // Center to node slightly to the left if on desktop so sidebar doesn't cover it
    const isMobile = window.innerWidth < 768;
    const offsetX = isMobile ? 0 : 200;
    const offsetY = isMobile ? -150 : 0; // Shift up on mobile so bottom sheet doesn't cover it
    
    setCenter(node.position.x + 110 + offsetX, node.position.y + 50 + offsetY, { 
      zoom: Math.max(getZoom(), 1.2), 
      duration: 800 
    });
  }, [setCenter, getZoom]);

  const handleSelectRelative = useCallback((id: string) => {
    setSelectedCatId(id);
    const node = nodes.find(n => n.id === id);
    if (node) {
      const isMobile = window.innerWidth < 768;
      const offsetX = isMobile ? 0 : 200;
      const offsetY = isMobile ? -150 : 0;
      setCenter(node.position.x + 110 + offsetX, node.position.y + 50 + offsetY, { 
        zoom: Math.max(getZoom(), 1.2), 
        duration: 800 
      });
    }
  }, [nodes, setCenter, getZoom]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedCatId(null)}
        fitView={window.innerWidth >= 768}
        fitViewOptions={{ padding: 0.1, maxZoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        className="bg-slate-900"
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls className="mb-4 ml-4 shadow-md rounded-xl overflow-hidden border-none bg-slate-800 fill-slate-300" showInteractive={false} />
      </ReactFlow>

      <Sidebar 
        cat={selectedCat} 
        isOpen={!!selectedCatId} 
        onClose={() => setSelectedCatId(null)} 
        onSelectRelative={handleSelectRelative}
        allCats={cats}
      />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <TreeFlow />
    </ReactFlowProvider>
  );
}
