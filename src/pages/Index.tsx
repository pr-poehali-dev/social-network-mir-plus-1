import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Post {
  id: number;
  author: string;
  authorId: number;
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

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Ваше Имя',
    username: 'username',
    bio: 'Расскажите о себе...',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    postsCount: 42,
    followersCount: 1234,
    followingCount: 356
  });

  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([
    { id: 1, name: 'Анна Петрова', username: 'anna_p', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', isFollowing: false },
    { id: 2, name: 'Дмитрий Козлов', username: 'dmitry_k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', isFollowing: false },
    { id: 3, name: 'Елена Смирнова', username: 'elena_s', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', isFollowing: true },
    { id: 4, name: 'Петр Иванов', username: 'petr_i', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petr', isFollowing: false },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Анна Петрова',
      authorId: 1,
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
      authorId: 2,
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
      authorId: 3,
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

  const toggleFollow = (userId: number) => {
    setSuggestedUsers(suggestedUsers.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
    
    setUserProfile(prev => ({
      ...prev,
      followingCount: suggestedUsers.find(u => u.id === userId)?.isFollowing 
        ? prev.followingCount - 1 
        : prev.followingCount + 1
    }));
  };

  const handleLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUserProfile({
      ...userProfile,
      name: formData.get('name') as string,
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
    });
    setEditProfileOpen(false);
  };

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
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
              <p className="text-muted-foreground mb-2">@{userProfile.username}</p>
              <p className="text-sm mb-4 max-w-md">{userProfile.bio}</p>
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userProfile.postsCount}</div>
                  <div className="text-sm text-muted-foreground">Постов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{userProfile.followersCount}</div>
                  <div className="text-sm text-muted-foreground">Подписчиков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{userProfile.followingCount}</div>
                  <div className="text-sm text-muted-foreground">Подписок</div>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => setEditProfileOpen(true)}
              >
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
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={toggleLike}
                onCommentLike={toggleCommentLike}
                onFollowAuthor={toggleFollow}
              />
            ))}
          </div>
          
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <h3 className="font-bold mb-4">Рекомендации</h3>
                <div className="space-y-3">
                  {suggestedUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{user.name}</div>
                        <div className="text-xs text-muted-foreground truncate">@{user.username}</div>
                      </div>
                      <Button
                        size="sm"
                        variant={user.isFollowing ? 'outline' : 'default'}
                        className={!user.isFollowing ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                        onClick={() => toggleFollow(user.id)}
                      >
                        {user.isFollowing ? 'Отписаться' : 'Подписаться'}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setLoginOpen(true)} onTerms={() => setTermsOpen(true)} />;
  }

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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSettingsOpen(false);
                      setEditProfileOpen(true);
                    }}
                  >
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSettingsOpen(false);
                      setTermsOpen(true);
                    }}
                  >
                    <Icon name="FileText" size={18} className="mr-2" />
                    Правила использования
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

      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
            <DialogDescription>Обновите информацию о себе</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" name="name" defaultValue={userProfile.name} required />
            </div>
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input id="username" name="username" defaultValue={userProfile.username} required />
            </div>
            <div>
              <Label htmlFor="bio">О себе</Label>
              <Textarea id="bio" name="bio" defaultValue={userProfile.bio} rows={3} />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
              Сохранить изменения
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Войти в Мир+</DialogTitle>
            <DialogDescription>Выберите способ входа</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={() => handleLogin('yandex')}
            >
              <div className="w-5 h-5 bg-red-500 rounded-sm" />
              Войти через Яндекс
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={() => handleLogin('google')}
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full" />
              Войти через Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={() => handleLogin('vk')}
            >
              <div className="w-5 h-5 bg-blue-600 rounded-sm" />
              Войти через ВКонтакте
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={() => handleLogin('telegram')}
            >
              <div className="w-5 h-5 bg-sky-500 rounded-full" />
              Войти через Telegram
            </Button>
            <Separator className="my-4" />
            <p className="text-xs text-center text-muted-foreground">
              Входя в систему, вы соглашаетесь с{' '}
              <button
                type="button"
                className="text-primary underline"
                onClick={() => {
                  setLoginOpen(false);
                  setTermsOpen(true);
                }}
              >
                Правилами использования
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Правила использования Мир+</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4 text-sm">
              <section>
                <h3 className="font-bold text-base mb-2">1. Общие положения</h3>
                <p className="text-muted-foreground">
                  Мир+ — это социальная сеть для обмена контентом и общения. Используя наш сервис, вы соглашаетесь соблюдать следующие правила.
                </p>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">2. Поведение пользователей</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Уважайте других пользователей</li>
                  <li>Не публикуйте оскорбительный или противозаконный контент</li>
                  <li>Не распространяйте спам и рекламу без разрешения</li>
                  <li>Не выдавайте себя за других людей</li>
                </ul>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">3. Контент</h3>
                <p className="text-muted-foreground">
                  Вы несете ответственность за контент, который публикуете. Запрещено публиковать материалы, нарушающие авторские права, содержащие насилие, дискриминацию или незаконную информацию.
                </p>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">4. Конфиденциальность</h3>
                <p className="text-muted-foreground">
                  Мы уважаем вашу конфиденциальность. Ваши персональные данные защищены и используются только для работы сервиса. Мы не передаем ваши данные третьим лицам без вашего согласия.
                </p>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">5. Интеллектуальная собственность</h3>
                <p className="text-muted-foreground">
                  Все материалы на Мир+ защищены авторским правом. Публикуя контент, вы предоставляете нам лицензию на его использование в рамках сервиса.
                </p>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">6. Нарушения</h3>
                <p className="text-muted-foreground">
                  За нарушение правил мы можем ограничить доступ к вашему аккаунту или удалить его. Решение принимается модераторами на основе жалоб и проверок.
                </p>
              </section>
              
              <section>
                <h3 className="font-bold text-base mb-2">7. Изменения в правилах</h3>
                <p className="text-muted-foreground">
                  Мы оставляем за собой право изменять эти правила. Актуальная версия всегда доступна в настройках.
                </p>
              </section>
            </div>
          </ScrollArea>
          <Button onClick={() => setTermsOpen(false)} className="w-full">
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoginScreen = ({ onLogin, onTerms }: { onLogin: () => void; onTerms: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
    <Card className="max-w-md w-full p-8 text-center bg-card/50 backdrop-blur-sm">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Мир+
      </h1>
      <p className="text-muted-foreground mb-8">Социальная сеть нового поколения</p>
      <Button 
        size="lg"
        className="w-full bg-gradient-to-r from-primary to-secondary mb-4"
        onClick={onLogin}
      >
        Войти или зарегистрироваться
      </Button>
      <div className="flex items-center justify-center gap-6 mt-6">
        <Icon name="Heart" size={32} className="text-primary" />
        <Icon name="Camera" size={32} className="text-secondary" />
        <Icon name="Share2" size={32} className="text-accent" />
      </div>
      <p className="text-xs text-muted-foreground mt-6">
        Нажимая "Войти", вы соглашаетесь с{' '}
        <button className="text-primary underline" onClick={onTerms}>
          Правилами использования
        </button>
      </p>
    </Card>
  </div>
);

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

const PostCard = ({ post, onLike, onCommentLike, onFollowAuthor }: { 
  post: Post; 
  onLike: (id: number) => void;
  onCommentLike: (postId: number, commentId: number) => void;
  onFollowAuthor: (userId: number) => void;
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
        <Button 
          size="sm"
          variant="outline"
          className="text-primary"
          onClick={() => onFollowAuthor(post.authorId)}
        >
          Подписаться
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