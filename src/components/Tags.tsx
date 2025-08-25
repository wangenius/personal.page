import React from 'react';
import Tag from './Tag';

interface TagsProps {
  tags: string[];
  className?: string;
}

const Tags: React.FC<TagsProps> = ({ tags, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </div>
  );
};

export default Tags;
