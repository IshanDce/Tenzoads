import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Calendar, User, Share2, Check } from 'lucide-react';
import { getPostBySlug } from '../services/api';
import LoadingState from '../components/common/LoadingState';
import PostCard from '../components/cards/PostCard';
import PlaceholderImage16x9 from '../components/mockups/PlaceholderImage16x9';
import CtaBand from '../components/common/CtaBand';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getPostBySlug(slug);
        if (res?.data) {
          setPost(res.data);
          setRelated(res.related || []);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading article');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <LoadingState message="Loading article..." />;
  }

  if (error || !post) {
    return (
      <div className="py-24 max-w-site mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-ink">Article Not Found</h2>
        <p className="text-muted">The engineering insight article could not be located.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | TenzoAds Engineering Blog`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-20 border-b border-borderCream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
            <Link to="/blogs" className="inline-flex items-center gap-1 hover:text-ink">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Blogs</span>
            </Link>
            <span>/</span>
            <span className="text-ink truncate">{post.title}</span>
          </nav>

          <span className="inline-block bg-amber px-3 py-1 rounded-full text-xs font-extrabold text-ink uppercase tracking-wider">
            {post.categoryDisplay || post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.18]">
            {post.title}
          </h1>

          {/* Author & Meta bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-borderCream/80 text-xs sm:text-sm text-neutral-600">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-ink text-amber flex items-center justify-center font-bold">
                <User className="w-4 h-4 text-amber" />
              </div>
              <div>
                <div className="font-bold text-ink">{post.author}</div>
                <div className="text-[11px] text-muted">{post.authorRole || 'Author'}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1 text-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1 text-ink font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{post.readTime}</span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light border border-borderCream hover:border-amber transition-colors text-ink font-bold text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <article className="py-16 md:py-20 bg-white border-b border-borderCream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header 16:9 Image Box */}
          <PlaceholderImage16x9
            label="ARTICLE ILLUSTRATION 16:9"
            badge={post.categoryDisplay || post.category}
            className="rounded-3xl shadow-soft"
          />

          {/* Article formatted content */}
          <div className="prose prose-lg max-w-none text-neutral-800 space-y-6 leading-relaxed">
            <div className="p-6 bg-cream-light rounded-2xl border-l-4 border-amber text-ink font-medium text-base sm:text-lg">
              {post.excerpt}
            </div>

            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-extrabold text-ink tracking-tight pt-6 pb-2"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="space-y-2 list-disc list-inside pl-2">
                    {paragraph.split('\n').map((li, idx) => (
                      <li key={idx} className="text-base text-neutral-700">
                        {li.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="pt-6 border-t border-borderCream flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider mr-2">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-cream-light text-ink border border-borderCream px-3 py-1 rounded-full text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-16 border-t border-borderCream space-y-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {related.map((relPost) => (
                  <PostCard key={relPost.slug} post={relPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
};

export default BlogDetail;
