import React, { useState, useMemo } from 'react';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';
import BlogNavbar from '../components/BlogNavbar';

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <BlogNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="absolute inset-0 bg-slate-950/90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Welcome to the Blog
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
              Explore articles about technology, development, and insights from our journey in the world of software engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tags */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'}
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              className="group bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-48 md:h-full">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/50 to-transparent" />
                  </div>
                </div>

                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{post.author.name}</p>
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}