export type CatStatus = 'alive' | 'dead' | 'lost' | 'adopted';

export interface CatData {
  id: string;
  name: string;
  generation: number;
  status: CatStatus;
  description: string;
  image?: string;
  color?: string;
  parents?: string[];
}

// Based on cat_family.txt
// Generating dummy parents to link generations until user clarifies
export const cats: CatData[] = [
  // Matriarch (Top of the tree)
  { id: 'perla', name: 'Perla', generation: 0, status: 'alive', description: 'The matriarch of the family.', image: '/images/perla.png' },

  // 1st Gen
  { id: 'mustafa', name: 'Mustafa', generation: 1, status: 'alive', description: '1st Gen.', parents: ['perla'] },
  { id: 'oreo', name: 'Oreo', generation: 1, status: 'alive', description: '1st Gen.', parents: ['perla'] },
  { id: 'mysterious', name: 'Mysterious character', generation: 1, status: 'alive', description: '1st Gen.', parents: ['perla'] },

  // 2nd Gen
  { id: 'sushi', name: 'Sushi', generation: 2, status: 'alive', description: '2nd Gen.', parents: ['mustafa'] },
  { id: 'papas', name: 'Papas', generation: 2, status: 'alive', description: 'el niño', parents: ['oreo'] },
  { id: 'chetos', name: 'Chetos', generation: 2, status: 'alive', description: 'el hermanisimo', parents: ['mysterious'] },

  // 3rd Gen
  { id: 'nube', name: 'Nube', generation: 3, status: 'alive', description: 'white with beige head top.', image: '/images/nube.png', parents: ['sushi'] },
  { id: 'donut', name: 'Donut', generation: 3, status: 'dead', description: 'full black.', color: 'black', parents: ['sushi'] },
  { id: 'panda', name: 'Panda', generation: 3, status: 'alive', description: 'black and white', parents: ['papas'] },
  { id: 'curry', name: 'Curry', generation: 3, status: 'alive', description: '3rd Gen.', parents: ['papas'] },
  { id: 'muffin', name: 'Muffin', generation: 3, status: 'alive', description: '3rd Gen.', parents: ['chetos'] },

  // 4th Gen
  { id: 'candy', name: 'Candy', generation: 4, status: 'alive', description: 'orange/black split on the head.', parents: ['nube'] },
  { id: 'coral', name: 'Coral', generation: 4, status: 'alive', description: 'same color as candy:', parents: ['nube'] },
  { id: 'couscous', name: 'Couscous', generation: 4, status: 'alive', description: 'light brown.', parents: ['donut'] },
  { id: 'puma', name: 'Puma', generation: 4, status: 'alive', description: 'darkgrey, white paws', parents: ['donut'] },
  { id: 'tigre', name: 'Tigre', generation: 4, status: 'alive', description: 'same as nube', parents: ['panda'] },
  { id: 'juju', name: 'Juju', generation: 4, status: 'alive', description: 'dark gray,', parents: ['curry'] },
  { id: 'cookie', name: 'Cookie', generation: 4, status: 'alive', description: 'like coffee', parents: ['muffin'] },

  // 5th Gen
  { id: 'rocky', name: 'Rocky', generation: 5, status: 'alive', description: 'pure white (because survivor)', color: 'white', parents: ['candy'] },
  { id: 'coffee', name: 'Coffee', generation: 5, status: 'alive', description: 'white with dark ears/tail/nose', parents: ['candy'] },
  { id: 'tarta', name: 'Tarta', generation: 5, status: 'alive', description: '(cake): similar to coffee but less darkness.', parents: ['coral'] },
  { id: 'arroz', name: 'Arroz', generation: 5, status: 'alive', description: '(rice): almost as white as rocky, but less.', parents: ['couscous'] },
  { id: 'mimi', name: 'Mimi', generation: 5, status: 'alive', description: 'somewhat similary white', parents: ['puma'] },
];
