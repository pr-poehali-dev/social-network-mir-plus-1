import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Post {
  id: number;
  author: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  likes: number;
  liked: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Анна Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      caption: 'Закаты в горах — это всегда магия! 🏔️✨',
      likes: 234,
      comments: [
        { id: 1, author: 'Иван', text: 'Невероятно красиво!', likes: 5, liked: false },
        { id: 2, author: 'Мария', text: 'Где это? Хочу туда!', likes: 3, liked: false }
      ],
      timestamp: '2 часа назад',
      liked: false
    },
    {
      id: 2,
      author: 'Дмитрий Козлов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      caption: 'Новый рецепт пасты карбонара 🍝 Получилось идеально!',
      likes: 156,
      comments: [
        { id: 1, author: 'Ольга', text: 'Поделитесь рецептом!', likes: 12, liked: false }
      ],
      timestamp: '5 часов назад',
      liked: false
    },
    {
      id: 3,
      author: 'Елена Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
      caption: 'Путешествие к океану 🌊 Свобода и вдохновение',
      likes: 789,
      comments: [
        { id: 1, author: 'Петр', text: 'Мечта!', likes: 8, liked: false },
        { id: 2, author: 'Катя', text: 'Скоро и я туда!', likes: 4, liked: false }
      ],
      timestamp: '1 день назад',
      liked: false
    }
  ]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
                : comment
            )
          }
        : post
    ));
  };

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-4 ring-4 ring-primary">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                <AvatarFallback>ВЫ</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold mb-2">Ваш Профиль</h2>
              <p className="text-muted-foreground mb-4">@username</p>
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">42</div>
                  <div className="text-sm text-muted-foreground">Постов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">1.2K</div>
                  <div className="text-sm text-muted-foreground">Подписчиков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">356</div>
                  <div className="text-sm text-muted-foreground">Подписок</div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Редактировать профиль
              </Button>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden hover-scale cursor-pointer">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=400&h=400&fit=crop`} 
                  alt={`Post ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'trends') {
      return (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🔥 Тренды
          </h2>
          <div className="space-y-4">
            {[
              { tag: '#ПутешествияМечты', posts: '12.5K постов' },
              { tag: '#ВкуснаяЕда', posts: '8.9K постов' },
              { tag: '#МотивацияДня', posts: '15.2K постов' },
              { tag: '#ИскусствоЖизни', posts: '6.7K постов' },
              { tag: '#ФотоДня', posts: '20.1K постов' }
            ].map((trend, i) => (
              <Card key={i} className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-primary">{trend.tag}</div>
                    <div className="text-sm text-muted-foreground">{trend.posts}</div>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Актуально
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={toggleLike}
            onCommentLike={toggleCommentLike}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Мир+
          </h1>
          <nav className="hidden md:flex items-center gap-1">
            <NavButton 
              icon="Home" 
              label="Рекомендации" 
              active={activeTab === 'recommendations'}
              onClick={() => setActiveTab('recommendations')}
            />
            <NavButton 
              icon="Users" 
              label="Лента" 
              active={activeTab === 'feed'}
              onClick={() => setActiveTab('feed')}
            />
            <NavButton 
              icon="TrendingUp" 
              label="Тренды" 
              active={activeTab === 'trends'}
              onClick={() => setActiveTab('trends')}
            />
            <NavButton 
              icon="User" 
              label="Профиль" 
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
          </nav>
          <div className="flex items-center gap-2">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                  <Icon name="Search" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Поиск</DialogTitle>
                </DialogHeader>
                <Input placeholder="Искать людей, хештеги..." className="mt-4" />
              </DialogContent>
            </Dialog>

            <Dialog open={messagesOpen} onOpenChange={setMessagesOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary/20">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Сообщения</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96">
                  <div className="space-y-4 mt-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-4 cursor-pointer hover-scale">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">Пользователь {i}</div>
                            <div className="text-sm text-muted-foreground">Привет! Как дела?</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent/20">
                  <Icon name="Settings" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Настройки</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="User" size={18} className="mr-2" />
                    Редактировать профиль
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" size={18} className="mr-2" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Lock" size={18} className="mr-2" />
                    Приватность
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="HelpCircle" size={18} className="mr-2" />
                    Помощь
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {renderContent()}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-around h-16">
          <MobileNavButton 
            icon="Home" 
            active={activeTab === 'recommendations'}
            onClick={() => setActiveTab('recommendations')}
          />
          <MobileNavButton 
            icon="Users" 
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
          />
          <MobileNavButton 
            icon="TrendingUp" 
            active={activeTab === 'trends'}
            onClick={() => setActiveTab('trends')}
          />
          <MobileNavButton 
            icon="User" 
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) => (
  <Button 
    variant={active ? 'default' : 'ghost'}
    onClick={onClick}
    className={active ? 'bg-gradient-to-r from-primary to-secondary' : 'hover:bg-primary/10'}
  >
    <Icon name={icon} size={18} className="mr-2" />
    {label}
  </Button>
);

const MobileNavButton = ({ icon, active, onClick }: { icon: string; active: boolean; onClick: () => void }) => (
  <Button 
    variant="ghost" 
    size="icon"
    onClick={onClick}
    className={active ? 'text-primary' : 'text-muted-foreground'}
  >
    <Icon name={icon} size={24} />
  </Button>
);

const PostCard = ({ post, onLike, onCommentLike }: { 
  post: Post; 
  onLike: (id: number) => void;
  onCommentLike: (postId: number, commentId: number) => void;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10">
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.avatar} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">{post.author}</div>
          <div className="text-sm text-muted-foreground">{post.timestamp}</div>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="MoreVertical" size={20} />
        </Button>
      </div>

      <img 
        src={post.image} 
        alt="Post" 
        className="w-full aspect-square object-cover"
      />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onLike(post.id)}
            className={post.liked ? 'text-red-500 animate-pulse-like' : ''}
          >
            <Icon name={post.liked ? 'Heart' : 'Heart'} size={24} className={post.liked ? 'fill-current' : ''} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowComments(!showComments)}>
            <Icon name="MessageCircle" size={24} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Send" size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Icon name="Bookmark" size={24} />
          </Button>
        </div>

        <div className="font-semibold">{post.likes.toLocaleString()} отметок "Нравится"</div>
        
        <div>
          <span className="font-semibold mr-2">{post.author}</span>
          <span>{post.caption}</span>
        </div>

        {post.comments.length > 0 && (
          <Button 
            variant="link" 
            className="p-0 h-auto text-muted-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            Посмотреть все комментарии ({post.comments.length})
          </Button>
        )}

        {showComments && (
          <div className="space-y-3 pt-2 border-t border-border">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <span className="font-semibold mr-2">{comment.author}</span>
                  <span>{comment.text}</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{comment.likes} отметок</span>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-xs"
                      onClick={() => onCommentLike(post.id, comment.id)}
                    >
                      {comment.liked ? '❤️ Нравится' : 'Нравится'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Input 
                placeholder="Добавить комментарий..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary"
                disabled={!newComment.trim()}
              >
                Отправить
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Index;
