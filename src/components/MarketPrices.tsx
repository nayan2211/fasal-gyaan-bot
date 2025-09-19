import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Search, MapPin, Calendar, DollarSign } from 'lucide-react';

interface MarketPrice {
  crop: string;
  hindi_name: string;
  market: string;
  state: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  arrival_date: string;
  units: string;
  trend: 'up' | 'down' | 'stable';
  change_percent: number;
}

const mockMarketData: MarketPrice[] = [
  {
    crop: 'Wheat',
    hindi_name: 'गेहूं',
    market: 'Ranchi',
    state: 'Jharkhand',
    min_price: 2050,
    max_price: 2150,
    modal_price: 2100,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'up',
    change_percent: 3.2
  },
  {
    crop: 'Rice',
    hindi_name: 'चावल',
    market: 'Jamshedpur',
    state: 'Jharkhand',
    min_price: 2800,
    max_price: 3200,
    modal_price: 3000,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'up',
    change_percent: 5.1
  },
  {
    crop: 'Maize',
    hindi_name: 'मक्का',
    market: 'Dhanbad',
    state: 'Jharkhand',
    min_price: 1850,
    max_price: 1950,
    modal_price: 1900,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'down',
    change_percent: -2.1
  },
  {
    crop: 'Onion',
    hindi_name: 'प्याज',
    market: 'Bokaro',
    state: 'Jharkhand',
    min_price: 1200,
    max_price: 1500,
    modal_price: 1350,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'stable',
    change_percent: 0.8
  },
  {
    crop: 'Potato',
    hindi_name: 'आलू',
    market: 'Ranchi',
    state: 'Jharkhand',
    min_price: 800,
    max_price: 1200,
    modal_price: 1000,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'up',
    change_percent: 12.5
  },
  {
    crop: 'Tomato',
    hindi_name: 'टमाटर',
    market: 'Jamshedpur',
    state: 'Jharkhand',
    min_price: 2000,
    max_price: 3000,
    modal_price: 2500,
    arrival_date: '2024-01-15',
    units: 'per quintal',
    trend: 'down',
    change_percent: -8.3
  }
];

export const MarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>(mockMarketData);
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>(mockMarketData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterPrices();
  }, [searchTerm, selectedMarket, selectedState, prices]);

  const filterPrices = () => {
    let filtered = prices;

    if (searchTerm) {
      filtered = filtered.filter(price => 
        price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.hindi_name.includes(searchTerm)
      );
    }

    if (selectedMarket !== 'all') {
      filtered = filtered.filter(price => price.market === selectedMarket);
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter(price => price.state === selectedState);
    }

    setFilteredPrices(filtered);
  };

  const refreshPrices = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Simulate price changes
      const updatedPrices = prices.map(price => ({
        ...price,
        modal_price: price.modal_price + (Math.random() - 0.5) * 100,
        change_percent: (Math.random() - 0.5) * 10,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable' as 'up' | 'down' | 'stable'
      }));
      setPrices(updatedPrices);
      setLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-earth-green" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 bg-muted rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-earth-green';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const uniqueMarkets = [...new Set(prices.map(p => p.market))];
  const uniqueStates = [...new Set(prices.map(p => p.state))];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          बाजार मूल्य / Market Prices
        </h1>
        <p className="text-muted-foreground">
          आज के ताजे भाव देखें / Check today's fresh rates
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-warm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="फसल खोजें / Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger>
                <SelectValue placeholder="मंडी चुनें / Select market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सभी मंडी / All Markets</SelectItem>
                {uniqueMarkets.map(market => (
                  <SelectItem key={market} value={market}>{market}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="राज्य चुनें / Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सभी राज्य / All States</SelectItem>
                {uniqueStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={refreshPrices} disabled={loading} className="w-full">
              {loading ? 'अपडेट हो रहा है... / Updating...' : 'रिफ्रेश / Refresh'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrices.map((price, index) => (
          <Card key={index} className="shadow-warm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {price.crop} / {price.hindi_name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {price.market}, {price.state}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(price.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                    {price.change_percent > 0 ? '+' : ''}{price.change_percent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  ₹{price.modal_price.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">{price.units}</p>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">न्यूनतम / Min</p>
                  <p className="font-semibold">₹{price.min_price.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">अधिकतम / Max</p>
                  <p className="font-semibold">₹{price.max_price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>अपडेट / Updated: {new Date(price.arrival_date).toLocaleDateString('hi-IN')}</span>
              </div>

              <Badge 
                variant={price.trend === 'up' ? 'default' : price.trend === 'down' ? 'destructive' : 'secondary'}
                className="w-full justify-center"
              >
                {price.trend === 'up' ? '📈 बढ़ती कीमत / Rising' : 
                 price.trend === 'down' ? '📉 गिरती कीमत / Falling' : 
                 '➡️ स्थिर / Stable'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrices.length === 0 && (
        <Card className="shadow-warm">
          <CardContent className="p-8 text-center">
            <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">कोई डेटा नहीं मिला / No Data Found</h3>
            <p className="text-muted-foreground">
              कृपया अपने फिल्टर बदलें / Please change your filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Market Insights */}
      <Card className="shadow-warm border-2 border-earth-gold/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-earth-gold">
            <TrendingUp className="w-5 h-5" />
            बाजार की जानकारी / Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-earth-green/10 rounded-lg">
              <h4 className="font-semibold text-earth-green mb-2">📈 सबसे ज्यादा बढ़ोतरी</h4>
              <p className="text-sm">आलू / Potato (+12.5%)</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <h4 className="font-semibold text-destructive mb-2">📉 सबसे ज्यादा गिरावट</h4>
              <p className="text-sm">टमाटर / Tomato (-8.3%)</p>
            </div>
            <div className="text-center p-4 bg-earth-blue/10 rounded-lg">
              <h4 className="font-semibold text-earth-blue mb-2">💰 सबसे ज्यादा कीमत</h4>
              <p className="text-sm">चावल / Rice (₹3,000)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};