
import { Project, ProjectType } from './types';

export const SUPPORT_ZALO = '0337.502.217';

export const INITIAL_PROJECTS: Project[] = [
  // --- VAY TIÊU DÙNG ---
  {
    id: 'loan-tnex',
    name: 'Tnex Finance',
    type: ProjectType.LOAN,
    logo: 'https://img.mservice.com.vn/app/img/payment_navigation/tnex.png',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    limit: 'Đến 50 Triệu',
    interestRate: '1.67% / tháng',
    description: 'Giải pháp vay tiêu dùng tín chấp 100% online từ ngân hàng số MSB.',
    referralCode: 'CTV1679',
    affiliateLink: 'https://landing.tnexfinance.com.vn/TnexDirectSale?sale_id=CTV1679',
    bankIntro: 'Tnex Finance là nền tảng dịch vụ tài chính thế hệ mới thuộc Ngân hàng TMCP Hàng Hải Việt Nam (MSB), chuyên cung cấp các giải pháp vay tiêu dùng 100% số hóa.',
    bankWebsite: 'tnexfinance.com.vn',
    advantages: ['Duyệt nhanh 15 phút', 'Không thẩm định người thân', 'Chỉ cần CCCD'],
    promo: 'Ưu tiên duyệt hồ sơ Finsmart',
    eligibility: ['Công dân VN 18-60 tuổi', 'Có CCCD gắn chip', 'Thu nhập từ 3tr/tháng'],
    steps: [
      { title: 'Tải App TNEX', description: 'Đăng ký tài khoản qua link.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600' }
    ],
    status: 'Published',
    order: 1,
    rating: 4.9,
    userCount: '50k+'
  },
  {
    id: 'loan-cake',
    name: 'Cake by VPBank (Vay)',
    type: ProjectType.LOAN,
    logo: 'https://cake.vn/wp-content/uploads/2021/01/logo-cake.png',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
    limit: 'Đến 100 Triệu',
    interestRate: '1.5% - 2.5% / tháng',
    description: 'Vay nhanh không chứng minh thu nhập, duyệt hồ sơ trong 2 phút trên App Cake.',
    referralCode: 'caker',
    affiliateLink: 'https://aff.cnext.vn/fin/CAKE_CASHLOAN/C240700357',
    bankIntro: 'Cake by VPBank là ngân hàng số hiện đại trực thuộc Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank), nổi bật với tốc độ phê duyệt hồ sơ vay siêu tốc.',
    bankWebsite: 'cake.vn',
    advantages: ['Phê duyệt tự động', 'Nhận tiền sau 5 phút', 'Dùng mã: caker'],
    promo: 'Duyệt nhanh trong 2 phút',
    eligibility: ['Sử dụng sim chính chủ', 'Độ tuổi 18-60', 'Lịch sử tín dụng tốt'],
    steps: [
      { title: 'Mở tài khoản Cake', description: 'Tải app và định danh eKYC.', image: 'https://images.unsplash.com/photo-1512428559083-560dfc18b225?w=600' }
    ],
    status: 'Published',
    order: 2,
    rating: 4.8,
    userCount: '30k+'
  },
  {
    id: 'loan-cub',
    name: 'CUB Finance',
    type: ProjectType.LOAN,
    logo: 'https://www.cathaybk.com.vn/v3/static/images/logo_cub.png',
    coverImage: 'https://images.unsplash.com/photo-1579621970795-87faff2f9050?w=800',
    limit: 'Đến 80 Triệu',
    interestRate: '1.8% / tháng',
    description: 'Sản phẩm vay tiêu dùng linh hoạt từ Cathay United Bank (CUB).',
    referralCode: 'CN + SĐT KHÁCH HÀNG',
    affiliateLink: 'https://aff.cnext.vn/fin/CUB/C240700357',
    bankIntro: 'CUB (Cathay United Bank) là một trong những định chế tài chính lớn nhất Đài Loan, cung cấp dịch vụ vay tiêu dùng uy tín tại thị trường Việt Nam.',
    bankWebsite: 'cathaybk.com.vn',
    advantages: ['Thủ tục đơn giản', 'Mã: CN + SĐT khách', 'Bảo mật thông tin'],
    promo: 'Giải ngân trong ngày',
    eligibility: ['CCCD chính chủ', 'Điện thoại smartphone', 'Không nợ xấu'],
    steps: [
      { title: 'Đăng ký link', description: 'Điền thông tin và chờ thẩm định.', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=600' }
    ],
    status: 'Published',
    order: 3,
    rating: 4.7,
    userCount: '15k+'
  },
  {
    id: 'loan-fe',
    name: 'FE Credit',
    type: ProjectType.LOAN,
    logo: 'https://fecredit.com.vn/wp-content/uploads/2016/10/logo-fe-credit.png',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    limit: 'Đến 70 Triệu',
    interestRate: '2.5% - 4% / tháng',
    description: 'Đơn vị cho vay tiêu dùng lớn nhất Việt Nam, thuộc VPBank.',
    affiliateLink: 'https://www.finconnect.vn/register-customer?ref=FNC00205',
    bankIntro: 'FE Credit là công ty tài chính tiêu dùng hàng đầu Việt Nam, tiền thân là khối Tín dụng tiêu dùng thuộc Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank).',
    bankWebsite: 'fecredit.com.vn',
    advantages: ['Phủ sóng 63 tỉnh thành', 'Luồng: Tư vấn viên', 'Hỗ trợ nợ nhóm'],
    promo: 'Tỷ lệ duyệt cao cho lao động tự do',
    eligibility: ['Thu nhập từ 3tr/tháng', 'Có bảo hiểm xã hội là lợi thế', 'CCCD gắn chip'],
    steps: [
      { title: 'Gửi yêu cầu vay', description: 'Điền form đăng ký online.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' }
    ],
    status: 'Published',
    order: 4,
    rating: 4.6,
    userCount: '100k+'
  },

  // --- THÈ TÍN DỤNG ---
  {
    id: 'card-vpbank',
    name: 'VPBank Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://www.vpbank.com.vn/-/media/Vpbank/General/Logo/Logo-VPBank-Green.png',
    coverImage: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800',
    limit: 'Đến 500 Triệu',
    interestRate: '3.1% / tháng',
    interestFreePeriod: '45 ngày',
    description: 'Thẻ tín dụng ưu việt cho mua sắm và trả góp 0%.',
    affiliateLink: 'https://sc.mfast.vn/vpbank_crc?code=56885',
    bankIntro: 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank) là ngân hàng thương mại uy tín hàng đầu, tiên phong trong công nghệ mở thẻ tín dụng 100% online.',
    bankWebsite: 'vpbank.com.vn',
    advantages: ['Hoàn tiền mua sắm', 'Freeship Shopee', 'Hướng dẫn nhập form + ảnh'],
    promo: 'Có hướng dẫn nhập form từng bước',
    eligibility: ['CCCD gắn chip', 'Thu nhập ổn định', 'Sống tại HN/HCM/Tỉnh lớn'],
    steps: [
      { title: 'Nhập form', description: 'Hướng dẫn nhập form từng bước.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600' }
    ],
    status: 'Published',
    order: 5,
    rating: 4.9,
    userCount: '45k+'
  },
  {
    id: 'card-ocb',
    name: 'OCB Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://www.ocb.com.vn/images/ocb_logo.png',
    coverImage: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    limit: 'Đến 200 Triệu',
    interestRate: '2.9% / tháng',
    interestFreePeriod: '55 ngày',
    description: 'Mở thẻ OCB thế hệ mới, nhận ưu đãi hoàn tiền cực khủng.',
    referralCode: 'CN + SĐT khách hàng',
    affiliateLink: 'https://aff.cnext.vn/fin/OCB_CRC/C240700357',
    bankIntro: 'Ngân hàng TMCP Phương Đông (OCB) là tổ chức tài chính năng động, cung cấp dòng thẻ tín dụng với nhiều đặc quyền hoàn tiền hấp dẫn.',
    bankWebsite: 'ocb.com.vn',
    advantages: ['Phí thường niên thấp', 'Hoàn tiền 10%', 'Mã: CN + SĐT khách'],
    promo: 'Hoàn tiền 10% mọi giao dịch',
    eligibility: ['CCCD chính chủ', 'Không nợ xấu', 'Thu nhập từ 5tr'],
    steps: [
      { title: 'Tải OCB Omni', description: 'Đăng ký thẻ trên ứng dụng.', image: 'https://images.unsplash.com/photo-1512428559083-560dfc18b225?w=600' }
    ],
    status: 'Published',
    order: 6,
    rating: 4.8,
    userCount: '22k+'
  },
  {
    id: 'card-lio',
    name: 'Liobank Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://liobank.vn/assets/images/logo.svg',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    limit: 'Đến 300 Triệu',
    interestRate: '3.0% / tháng',
    interestFreePeriod: '62 ngày',
    description: 'Thẻ tín dụng số Liobank - Phê duyệt 100% online.',
    affiliateLink: 'https://sc.mfast.vn/lio_bank_crc?code=56885',
    bankIntro: 'Liobank là ngân hàng số thế hệ mới được phát triển trên nền tảng của Ngân hàng TMCP Hàng Hải Việt Nam (MSB), tập trung vào trải nghiệm số hóa tối giản.',
    bankWebsite: 'liobank.vn',
    advantages: ['Hướng dẫn bằng ảnh', 'Hoàn tiền 20%', 'Apple Pay tích hợp'],
    promo: 'Hoàn tiền 20% tháng đầu',
    eligibility: ['Có CCCD gắn chip', 'Smartphone IOS/Android', 'SĐT chính chủ'],
    steps: [
      { title: 'Chụp ảnh CCCD', description: 'Định danh eKYC trên app.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' }
    ],
    status: 'Published',
    order: 7,
    rating: 4.9,
    userCount: '60k+'
  },
  {
    id: 'card-cake',
    name: 'Cake Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://cake.vn/wp-content/uploads/2021/01/logo-cake.png',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
    limit: 'Đến 100 Triệu',
    interestRate: '3.25% / tháng',
    interestFreePeriod: '45 ngày',
    description: 'Thẻ tín dụng Freedom từ ngân hàng số Cake.',
    affiliateLink: 'https://aff.cnext.vn/fin/OCB_CRC/C240700357',
    bankIntro: 'Thẻ tín dụng Cake thuộc Ngân hàng số Cake by VPBank, mang đến giải pháp chi tiêu linh hoạt và đặc quyền hoàn tiền cho các dịch vụ số.',
    bankWebsite: 'cake.vn',
    advantages: ['Hoàn tiền Be/Grab', 'Duyệt trong 2 phút', 'Tài khoản VPBank'],
    promo: 'Đặc quyền hoàn tiền di chuyển',
    eligibility: ['Khách hàng sử dụng Cake', 'CCCD gắn chip', 'Dưới 60 tuổi'],
    steps: [
      { title: 'Đăng ký thẻ', description: 'Chọn mục thẻ tín dụng trên Cake.', image: 'https://images.unsplash.com/photo-1512428559083-560dfc18b225?w=600' }
    ],
    status: 'Published',
    order: 8,
    rating: 4.7,
    userCount: '18k+'
  },
  {
    id: 'card-vib',
    name: 'VIB Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://www.vib.com.vn/static/media/logo.2929e798.svg',
    coverImage: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=800',
    limit: 'Đến 600 Triệu',
    interestRate: '2.8% / tháng',
    interestFreePeriod: '55 ngày',
    description: 'Đặc quyền hoàn tiền và phòng chờ sân bay hạng thương gia.',
    referralCode: '233105',
    affiliateLink: 'https://maxvib.go.link/?adj_t=1ap89dnc&ref=233105&adj_label=233105&openmgm=true',
    bankIntro: 'Ngân hàng Quốc tế (VIB) là một trong những ngân hàng dẫn đầu về xu thế thẻ tín dụng tại Việt Nam với các dòng thẻ chuyên biệt cao cấp.',
    bankWebsite: 'vib.com.vn',
    advantages: ['Mã: 233105', 'Bảo hiểm du lịch 10 tỷ', 'Hoàn 10% ăn uống'],
    promo: 'Ưu đãi phòng chờ sân bay',
    eligibility: ['Thu nhập từ 7tr/tháng', 'CCCD gắn chip', 'Hộ khẩu Tỉnh/Thành lớn'],
    steps: [
      { title: 'Nhập mã giới thiệu', description: 'Sử dụng mã 233105 để được ưu tiên.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' }
    ],
    status: 'Published',
    order: 9,
    rating: 4.8,
    userCount: '35k+'
  },
  {
    id: 'card-tpbank',
    name: 'TPBank Credit Card',
    type: ProjectType.CREDIT_CARD,
    logo: 'https://tpb.vn/wps/themes/html/TPB_Theme_V2/images/logo.png',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    limit: 'Đến 300 Triệu',
    interestRate: '3.1% / tháng',
    interestFreePeriod: '45 ngày',
    description: 'Thẻ tín dụng EVO phê duyệt tự động cho người trẻ.',
    affiliateLink: 'https://aff.cnext.vn/fin/OCB_CRC/C240700357',
    bankIntro: 'TPBank EVO là sản phẩm thẻ tín dụng của Ngân hàng TMCP Tiên Phong, nổi tiếng với quy trình phê duyệt hoàn toàn tự động dựa trên Big Data.',
    bankWebsite: 'tpb.vn',
    advantages: ['Duyệt tự động', 'Không cần chứng minh TN', 'Hoàn tiền online'],
    promo: 'Mở thẻ EVO - Duyệt trong 15 phút',
    eligibility: ['SĐT chính chủ', 'CCCD gắn chip', '22-55 tuổi'],
    steps: [
      { title: 'Đăng ký EVO', description: 'Truy cập link và điền thông tin.', image: 'https://images.unsplash.com/photo-1512428559083-560dfc18b225?w=600' }
    ],
    status: 'Published',
    order: 10,
    rating: 4.8,
    userCount: '42k+'
  }
];

export const ADMIN_CREDENTIALS = {
  user: 'phucnguyne',
  pass: '123456'
};
