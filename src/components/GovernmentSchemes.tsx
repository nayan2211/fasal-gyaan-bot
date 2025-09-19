import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Search, ExternalLink, FileText, DollarSign, Users, Calendar } from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  hindi_name: string;
  category: 'subsidy' | 'insurance' | 'loan' | 'training' | 'equipment';
  description: string;
  hindi_description: string;
  eligibility: string[];
  benefits: string[];
  documents_required: string[];
  application_process: string[];
  deadline: string;
  contact_info: string;
  website_url: string;
  amount: string;
  status: 'active' | 'coming_soon' | 'expired';
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN',
    hindi_name: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    category: 'subsidy',
    description: 'Income support scheme providing ₹6000 per year to farmer families',
    hindi_description: 'किसान परिवारों को प्रति वर्ष ₹6000 की आर्थिक सहायता',
    eligibility: [
      'Small and marginal farmers',
      'Landholding up to 2 hectares',
      'Indian citizen'
    ],
    benefits: [
      '₹2000 every 4 months',
      'Direct bank transfer',
      'Total ₹6000 per year'
    ],
    documents_required: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land Records',
      'Mobile Number'
    ],
    application_process: [
      'Visit pmkisan.gov.in',
      'Click on Farmer Registration',
      'Fill required details',
      'Submit documents',
      'Wait for verification'
    ],
    deadline: '2024-12-31',
    contact_info: 'PM-KISAN Helpline: 155261',
    website_url: 'https://pmkisan.gov.in',
    amount: '₹6,000 per year',
    status: 'active'
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    hindi_name: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'insurance',
    description: 'Crop insurance scheme to protect farmers against crop losses',
    hindi_description: 'फसल नुकसान से किसानों की सुरक्षा के लिए बीमा योजना',
    eligibility: [
      'All farmers',
      'Sharecroppers and tenant farmers',
      'Must have crop loan'
    ],
    benefits: [
      'Coverage against natural calamities',
      'Premium subsidy up to 95%',
      'Quick claim settlement'
    ],
    documents_required: [
      'Land Records',
      'Aadhaar Card',
      'Bank Account',
      'Sowing Certificate'
    ],
    application_process: [
      'Apply through bank',
      'Online at pmfby.gov.in',
      'Submit before sowing',
      'Pay premium',
      'Get insurance coverage'
    ],
    deadline: '2024-06-30',
    contact_info: 'PMFBY Toll-free: 14447',
    website_url: 'https://pmfby.gov.in',
    amount: 'Premium from ₹500-2000',
    status: 'active'
  },
  {
    id: '3',
    name: 'Kisan Credit Card',
    hindi_name: 'किसान क्रेडिट कार्ड',
    category: 'loan',
    description: 'Credit facility for agricultural and allied activities',
    hindi_description: 'कृषि और संबंधित गतिविधियों के लिए ऋण सुविधा',
    eligibility: [
      'Farmers with land records',
      'Tenant farmers with valid agreement',
      'Self Help Group members'
    ],
    benefits: [
      'Credit limit up to ₹3 lakh',
      'Low interest rate (7%)',
      'Flexible repayment',
      'Insurance coverage included'
    ],
    documents_required: [
      'Land Records',
      'Aadhaar Card',
      'PAN Card',
      'Bank Statements'
    ],
    application_process: [
      'Visit nearest bank',
      'Fill KCC application',
      'Submit documents',
      'Bank verification',
      'Card issuance'
    ],
    deadline: 'Ongoing',
    contact_info: 'Bank Branch / CSC Center',
    website_url: 'https://kcc.gov.in',
    amount: 'Up to ₹3,00,000',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sub-Mission on Agricultural Mechanization',
    hindi_name: 'कृषि यांत्रिकीकरण पर उप-मिशन',
    category: 'equipment',
    description: 'Subsidy on agricultural machinery and equipment',
    hindi_description: 'कृषि मशीनरी और उपकरणों पर सब्सिडी',
    eligibility: [
      'All categories of farmers',
      'Custom Hiring Centers',
      'FPOs and cooperatives'
    ],
    benefits: [
      'Subsidy up to 50%',
      'SC/ST farmers get 70% subsidy',
      'Women farmers get additional benefits'
    ],
    documents_required: [
      'Land Records',
      'Caste Certificate (if applicable)',
      'Bank Account Details',
      'Equipment quotation'
    ],
    application_process: [
      'Apply at District Agriculture Office',
      'Online application portal',
      'Document verification',
      'Subsidy approval',
      'Purchase equipment'
    ],
    deadline: '2024-08-31',
    contact_info: 'District Agriculture Officer',
    website_url: 'https://agrimachinery.nic.in',
    amount: '50-70% subsidy',
    status: 'active'
  }
];

export const GovernmentSchemes = () => {
  const [schemes] = useState<Scheme[]>(mockSchemes);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>(mockSchemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const filterSchemes = () => {
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.hindi_name.includes(searchTerm) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    setFilteredSchemes(filtered);
  };

  useEffect(() => {
    filterSchemes();
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return '💰';
      case 'insurance': return '🛡️';
      case 'loan': return '🏦';
      case 'training': return '📚';
      case 'equipment': return '🚜';
      default: return '📄';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'subsidy': return 'सब्सिडी / Subsidy';
      case 'insurance': return 'बीमा / Insurance';
      case 'loan': return 'ऋण / Loan';
      case 'training': return 'प्रशिक्षण / Training';
      case 'equipment': return 'उपकरण / Equipment';
      default: return 'अन्य / Other';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-earth-green text-white';
      case 'coming_soon': return 'bg-earth-gold text-white';
      case 'expired': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          सरकारी योजनाएं / Government Schemes
        </h1>
        <p className="text-muted-foreground">
          किसानों के लिए उपलब्ध सरकारी योजनाओं की जानकारी
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-warm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="योजना खोजें / Search schemes..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  filterSchemes();
                }}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              filterSchemes();
            }}>
              <SelectTrigger>
                <SelectValue placeholder="श्रेणी चुनें / Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सभी श्रेणी / All Categories</SelectItem>
                <SelectItem value="subsidy">💰 सब्सिडी / Subsidy</SelectItem>
                <SelectItem value="insurance">🛡️ बीमा / Insurance</SelectItem>
                <SelectItem value="loan">🏦 ऋण / Loan</SelectItem>
                <SelectItem value="training">📚 प्रशिक्षण / Training</SelectItem>
                <SelectItem value="equipment">🚜 उपकरण / Equipment</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">
                कुल योजनाएं: {filteredSchemes.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="shadow-warm">
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">{getCategoryIcon(scheme.category)}</span>
                      <div>
                        <CardTitle className="text-lg">
                          {scheme.name} / {scheme.hindi_name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {scheme.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status === 'active' ? 'सक्रिय / Active' :
                         scheme.status === 'coming_soon' ? 'जल्द आने वाली / Coming Soon' :
                         'समाप्त / Expired'}
                      </Badge>
                      <Badge variant="outline">
                        {scheme.amount}
                      </Badge>
                      {expandedScheme === scheme.id ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-earth-green" />
                      लाभ / Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scheme.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-earth-green/10 rounded">
                          <span className="text-earth-green">✓</span>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-earth-blue" />
                      पात्रता / Eligibility
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scheme.eligibility.map((criteria, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-earth-blue/10 rounded">
                          <span className="text-earth-blue">•</span>
                          <span className="text-sm">{criteria}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Required */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-earth-gold" />
                      आवश्यक दस्तावेज / Required Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scheme.documents_required.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-earth-gold/10 rounded">
                          <span className="text-earth-gold">📄</span>
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Process */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-earth-brown" />
                      आवेदन प्रक्रिया / Application Process
                    </h4>
                    <div className="space-y-2">
                      {scheme.application_process.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-earth-brown/10 rounded">
                          <Badge variant="secondary" className="min-w-[2rem] h-8 flex items-center justify-center">
                            {i + 1}
                          </Badge>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Apply */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">संपर्क जानकारी / Contact Info</h5>
                        <p className="text-sm text-muted-foreground">{scheme.contact_info}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong>अंतिम तिथि / Deadline:</strong> {scheme.deadline}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button className="w-full" asChild>
                          <a href={scheme.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            ऑनलाइन आवेदन / Apply Online
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full">
                          अधिक जानकारी / More Info
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <Card className="shadow-warm">
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">कोई योजना नहीं मिली / No Schemes Found</h3>
            <p className="text-muted-foreground">
              कृपया अपने खोज शब्द या फिल्टर बदलें / Please change your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};