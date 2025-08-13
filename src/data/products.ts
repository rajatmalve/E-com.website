import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium White Paper Roll',
    price: 120,
    image: 'HRT-roll.jpg',
    images: [
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      'https://images.pexels.com/photos/4207703/pexels-photo-4207703.jpeg',
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg',
      'https://images.pexels.com/photos/159733/paper-crafts-paper-colorful-paper-159733.jpeg'
    ],
    description: 'High-quality premium white paper roll perfect for printing and packaging applications.',
    category: 'Premium',
    specifications: {
      width: '24 inches',
      length: '500 feet',
      weight: '80 GSM',
      material: 'Premium Wood Pulp'
    }
  },
  {
    id: 2,
    name: 'Recycled Brown Paper Roll',
    price: 95,
    image: 'baking-paper-roll.jpg',
    images: [
      'https://images.pexels.com/photos/4207703/pexels-photo-4207703.jpeg',
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg',
      'https://images.pexels.com/photos/159733/paper-crafts-paper-colorful-paper-159733.jpeg'
    ],
    description: 'Eco-friendly recycled brown paper roll, ideal for sustainable packaging solutions.',
    category: 'Eco-Friendly',
    specifications: {
      width: '18 inches',
      length: '400 feet',
      weight: '70 GSM',
      material: 'Recycled Paper Fiber'
    }
  },
  {
    id: 3,
    name: 'Kraft Paper Roll',
    price: 85,
    image: 'kitchen-roll.webp',
    images: [
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg',
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      'https://images.pexels.com/photos/4207703/pexels-photo-4207703.jpeg',
      'https://images.pexels.com/photos/159733/paper-crafts-paper-colorful-paper-159733.jpeg'
    ],
    description: 'Durable kraft paper roll with excellent tear resistance for heavy-duty packaging.',
    category: 'Industrial',
    specifications: {
      width: '36 inches',
      length: '600 feet',
      weight: '100 GSM',
      material: 'Kraft Wood Pulp'
    }
  },
  {
    id: 4,
    name: 'Glossy Paper Roll',
    price: 140,
    image: 'HRT-roll.jpg',
    images: [
      '/HRT-roll.jpg',
      '/HRT-roll.jpg',
      '/HRT-roll.jpg',
      '/HRT-roll.jpg'
    ],
    description: 'High-gloss finish paper roll perfect for professional printing and photography.',
    category: 'Professional',
    specifications: {
      width: '24 inches',
      length: '300 feet',
      weight: '120 GSM',
      material: 'Coated Paper'
    }
  },
  {
    id: 5,
    name: 'Newsprint Paper Roll',
    price: 75,
    image: 'toilet roll.jpg',
    images: [
      'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      'https://images.pexels.com/photos/4207703/pexels-photo-4207703.jpeg',
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg'
    ],
    description: 'Cost-effective newsprint paper roll for newspapers and temporary applications.',
    category: 'Economy',
    specifications: {
      width: '30 inches',
      length: '800 feet',
      weight: '48 GSM',
      material: 'Recycled Newsprint'
    }
  },
  {
    id: 6,
    name: 'Art Paper Roll',
    price: 160,
    image: 'baking-paper-roll.jpg',
    images: [
      'baking-paper-roll.jpg',
      'baking-paper-roll.jpg',
      'https://images.pexels.com/photos/4207703/pexels-photo-4207703.jpeg',
      'https://images.pexels.com/photos/159733/paper-crafts-paper-colorful-paper-159733.jpeg'
    ],
    description: 'Premium art paper roll with smooth texture, perfect for fine art and design projects.',
    category: 'Art & Design',
    specifications: {
      width: '42 inches',
      length: '250 feet',
      weight: '150 GSM',
      material: 'Fine Art Paper'
    }
  }
];