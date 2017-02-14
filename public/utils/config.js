// search parameters
var searchConfig = {
  'locations': [ 'AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','GU','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MH','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY', 'OH','OK','OR','PA','PR','PW','RI','SC','SD','TN','TX','UT','VA','VI','VT','WA','WI','WV','WY' ],
  'businessUnit': [ 'CEO', 'Engineering', 'Sales', 'Marketing', 'Product', 'Finance', 'Operations', 'Customer Success/Support', 'Professional Services', 'Business Development', 'Investor Relations', 'Venture Capital', 'Legal' ],
  'position': [ 'Exec', 'Sr', 'Jr', 'Director', 'VP', 'Intern', 'CEO', 'CFO', 'COO', 'CMO', 'CRO', 'CTO' ],
  'rating': [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F' ],
  'metWith': [ 'GB', 'GD', 'LD', 'MC', 'PAD', 'RM'],
  'vertical': [ 'Healthcare IT', 'Cloud Infrastructure', 'Data & Analytics', 'Cybersecurity' ],
  'company': [ 'Able To', 'Adtuitive', 'ambient', 'annum', 'AuthAir', 'axial',
              'Bedrock Data', 'BIA', 'Carbon Black', 'Chosen Security', 'CloudHealth',
              'Compass', 'Connotate', 'Copatient', 'Digitalsmiths', 'EnergyHub',
              'Event Farm', 'healthdialog', 'indico', 'iorahealth', 'Jisto', 'Kaltura',
              'lexumo', 'Mashery', 'memento', 'mineraltree', 'Nomad', 'onapsis', 'optaros',
              'Pwnie Express', 'Redox', 'Reltio', 'Revmetrix', 'Simon', 'Terbium Labs',
              'ThingMagic', 'ThreatGrid', 'threat stack', 'Vaultive', 'VeraCode', 'WellAware Systems',
              'woodpellets.com' ]
}

var names = [ 'Graham', 'Maria', 'Liam', 'Greg', 'Rob', 'Payal'];

var ratings = {
  'A+': 0,
  'A': 1,
  'A-': 2,
  'B+': 3,
  'B': 4,
  'B-': 5,
  'C+': 6,
  'C': 7,
  'C-': 8,
  'F': 9
}
