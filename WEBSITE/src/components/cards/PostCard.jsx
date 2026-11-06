import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage16x9 from '../mockups/PlaceholderImage16x9';
import { formatImageUrl } from '../../services/api';

export const PostCard = ({ post }) => {
  const [imgError, setImgError] = useState(false);
  const formattedCover = formatImageUrl(post.coverImage);
  const showCover = Boolean(formattedCover && !imgError);

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1">
      <div>
        <Link to={`/blogs/${post.slug}`} className="block overflow-hidden">
          {showCover ? (
            <div className="relative aspect-video w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-2.5">
              {/* Subtle ambient backdrop for edge filling */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-md scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${formattedCover})` }}
              />
              <img
                src={formattedCover}
                alt={post.title}
                className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-lg drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={() => setImgError(true)}
              />
              <span className="absolute top-3 left-3 z-20 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                {post.categoryDisplay || post.category}
              </span>
            </div>
          ) : (
            <PlaceholderImage16x9
              label="IMAGE 16:9"
              badge={post.categoryDisplay || post.category}
            />
          )}
        </Link>

        <div className="p-6">
          {/* Category label in blue caps */}
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
            {post.categoryDisplay || post.category}
          </span>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-2.5 leading-snug group-hover:text-blue-600 transition-colors">
            <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Meta bottom bar */}
      <div className="px-6 pb-6 pt-2 text-xs font-semibold text-slate-400 border-t border-slate-100 flex items-center justify-between">
        <span>{post.author}</span>
        <div className="flex items-center gap-1.5">
          <span>{post.date}</span>
          <span>•</span>
          <span className="text-slate-800 font-bold">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
