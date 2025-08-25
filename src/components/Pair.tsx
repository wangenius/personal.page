import React from 'react';
import Image from 'next/image';

interface PairProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
}

const Pair: React.FC<PairProps> = ({ title, description, image, className = '' }) => {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      {image && (
        <div className="mb-4">
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="rounded-lg w-full"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Pair;
