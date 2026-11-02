import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage16x9 from '../mockups/PlaceholderImage16x9';

export const PostCard = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl border border-borderCream overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-soft-hover hover:border-amber-300 hover:-translate-y-1">
      <div>
        <Link to={`/blogs/${post.slug}`} className="block">
          <PlaceholderImage16x9
            label="IMAGE 16:9"
            badge={post.categoryDisplay || post.category}
          />
        </Link>

        <div className="p-6">
          {/* Category label in amber caps */}
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-2">
            {post.categoryDisplay || post.category}
          </span>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight mb-2.5 leading-snug group-hover:text-amber transition-colors">
            <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Meta bottom bar */}
      <div className="px-6 pb-6 pt-2 text-xs font-semibold text-neutral-400 border-t border-cream-light flex items-center justify-between">
        <span>{post.author}</span>
        <div className="flex items-center gap-1.5">
          <span>{post.date}</span>
          <span>•</span>
          <span className="text-ink font-bold">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
