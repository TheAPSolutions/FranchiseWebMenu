import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('En');

  // Using WritableSignal for reactive titles
  DropDownTitle = signal<string>('Choose Location');
  TableTitle = signal<string>('Table Number');
  TotalTitle = signal<string>('Total');
  OrderButton = signal<string>('Order');
  NotesButton = signal<string>('Notes');
  MenuPageTitle = signal<string>('Menu Page Title');
  OurBranches = signal<string>('OurBranches');
  CallBranch = signal<string>('CallBranch');
  GetDirection = signal<string>('CallBranch');
  OurOffers = signal<string>('Our Offers');
  OurApplication = signal<string>('Our Application');
  OurSocials = signal<string>('Our Socials');
  Description = signal<string>('Description');
  LearnMore = signal<string>('Learn More');
  Home = signal<string>('Home');
  Menu = signal<string>('Menu');
  Cart = signal<string>('Cart');
  SuccessOrder = signal<string>('Your Order Has been Sent Successfully');
  Thanks = signal<string>('Thank You for Choosing Hungry Birds');
  RatingReminder = signal<string>(
    "Your opinion matters to us! Don't forget to rate your order and help us improve your experience."
  );
  RateUs = signal<string>('Rate Us');
  CannotRate = signal<string>(
    'Thank you for your time this order has been rated.'
  );
  YourOpinion = signal<string>('Your Opinion');
  StudentOrder = signal<string>(
    'To Get Student Price Please Enter Your Student Number'
  );
  TypeOfOrder = signal<string>('Type Of Order');
  DineIn = signal<string>('Dine In');
  TakeAway = signal<string>('Take Away');

  //cashier Interface
  NewOrderPageTitle = signal<string>('New Orders');
  OrderNumber = signal<string>('Order Number');
  TableNumber = signal<string>('Table Number');
  Total = signal<string>('Total');
  Time = signal<string>('Time');
  OrderDetails = signal<string>('Order Details');
  ViewOrderDetails = signal<string>('View Order Details');
  ReadyOrders = signal<string>('Ready Orders');
  setOrderReady = signal<string>('Order Ready');

  //Single Order Page
  ItemName = signal<string>('Item Name');
  ItemCount = signal<string>('Item Count');
  ItemNote = signal<string>('Item Note');
  price = signal<string>('Price');
  OrderSaved = signal<string>('Order Saved');
  PrintOrder = signal<string>('Print the Order');

  //Ordres History
  OrdersHistory = signal<string>('Orders History');
  Date = signal<string>('Date');

  //cashier navigation
  NewOrders = signal<string>('New Orders');
  TodaysOrder = signal<string>("Today's Orders");

  //sucess message
  YourOrderID = signal<string>('Your Order ID:  ');

  //notes overlay

  notesTitle = signal<string>('Enter your notes');
  notesPlaceholder = signal<string>('For Example: No Pickles, Cheddar Sauce');
  Save = signal<string>('Save');

  //scanner title
  scannerTitle = signal<string>('Please scan the Qr Code');
  scannerCloseButton = signal<string>('Close Scanner');

  //rating

  ratingMessage = signal<string>(
    'Thank you for rating! We are waiting for you again'
  );
  validate = signal<string>('validate');
  categoryName = signal<string>('Category');

  //Payment
  PaymentMethod = signal<string>('Choose Your Payment Method');
  PayCashier = signal<string>('Pay At The Cashier');
  PayCard = signal<string>('Pay By Card');
  PhoneVerification = signal<string>('Phone Number Verification');
  Accept = signal<string>(
    'I accept receiving campaigns and promotional offers messages'
  );
  GetCode = signal<string>('Get Code');
  VerificationSent = signal<string>(
    'A Verification Code has been sent to Your Number Via SMS. Please enter it below.'
  );
  SendOrder = signal<string>('Send Order');
  VerificationCode = signal<string>('Verification Code');
  ContinueToPayment = signal<string>('Continue To Payment');
  EnterNumber = signal<string>('Please enter your phone number. A message will be sent to you when your order is ready.');
  SendingCode = signal<string>('A code is being sent to you.');

  //Admin Interface
  CategroyNameAdmin = signal<string>('Category Name');
  UploadImage = signal<string>('Upload Image');
  AddCategroy = signal<string>('Add Categroy');
  LogOut = signal<string>('Log Out');
  MenuList = signal<string>('Menu List');
  CategoryList = signal<string>('Category List');
  MenuOrder = signal<string>('Menu Order');
  CategoryOrder = signal<string>('Categories Order');
  SubCategoryOrder = signal<string>('Sub Categories Order');
  Offers = signal<string>('Offers');
  ExportMenu = signal<string>('Export Menu');
  IncreasePrice = signal<string>('Increase price by');
  DecreasePrice = signal<string>('Decrease price by');
  PercentagePrice = signal<string>('Percentage Price');
  PercentageDiscountPrice = signal<string>('Percentage discount Price');
  Categories = signal<string>('Categories');
  NoCategories = signal<string>('There are no categories');
  Search = signal<string>('There are no categories');
  MenuItems = signal<string>('Menu Items');
  AddItem = signal<string>('Add Item');
  Image = signal<string>('Image');
  Name = signal<string>('Name');
  Price = signal<string>('Price');
  ProductName = signal<string>('Product Name');
  NumberOrder = signal<string>('Number Of Times Ordered');
  StudentPrice = signal<string>('Student Price');
  Category = signal<string>('Category');
  Prices = signal<string>('Prices');
  MenuItemsOrder = signal<string>('Menu Items Order');
  SelectCategory = signal<string>('Select Category');
  Discount = signal<string>('Discount');
  AddOffer = signal<string>('Add Offer');
  ExportMenuExcel = signal<string>('Export Menu Excel');
  ExportMenuPDF = signal<string>('Export Menu PDF');
  SubCategories = signal<string>('Sub Categories List');
  addSubCategory = signal<string>('Add Sub Category');
  isSubCategory = signal<string>('is Sub Category');
  viewMenuItems = signal<string>('View Menu Items');
  menuItemsOfSubCategory = signal<string>('Menu Items Of Sub Category');

  //Dashboard
  // Variable Definitions
  Dashboard = signal<string>('Dashboard');
  numberOfOrders = signal<string>('Number Of Orders');
  numberOfDineInOrders = signal<string>('Number Of Dine In Orders');
  numberOfTakeAwayOrders = signal<string>('Number Of Take Away Orders');
  totalSalesPerMonth = signal<string>('Total Sales Per Month');
  paidByCashier = signal<string>('Paid By Cashier');
  paidByCard = signal<string>('Paid By Card');
  numberOfSoldItems = signal<string>('Number Of Sold Items');
  topSale5Items = signal<string>('Top Sale 5 Items');
  salesBetweenMonths = signal<string>('Sales Between Months');
  salesBetweenBranches = signal<string>('Sales Between Branches');
  selectYear = signal<string>('Select Year:');
  selectMonth = signal<string>('Select Month:');
  cashierPaymentManager = signal<string>('Cashier Payment Manager');
  selectBranch = signal<string>('Select Branch:');
  startDate = signal<string>('Start Date:');
  endDate = signal<string>('End Date:');
  selectedBranch = signal<string>('Selected Branch:');
  chosenDate = signal<string>('Chosen Date:');
  totalSales = signal<string>('Total Sales:');
  orderID = signal<string>('Order ID');
  totalPrice = signal<string>('Total Price');
  onlinePaymentManager = signal<string>('Online Payment Manager');
  salesPerformanceBetweenPreviousTwoMonths = signal<string>(
    'Sales Performance Between Previous Two Months'
  );
  itemPerformancePerBranch = signal<string>('Item Performance Per Branch');
  selectCategory = signal<string>('Select Category:');
  selectMenuItem = signal<string>('Select Menu Item:');
  noSalesDataAvailable = signal<string>('No sales data available for the selected category, menu item, month, and year.');

  currentLanguage$ = this.languageSubject.asObservable();

  // Variable Definitions
  selectYourOptions = signal<string>('Select Your Options:');
  drinks = signal<string>('Drinks');
  sandwich = signal<string>('Sandwich');
  saveChoices = signal<string>('Save Choices');

  manageMenuItemOptions = signal<string>('Manage MenuItem Options');
  pleaseSelectFollowing = signal<string>('Please select the following');
  hasDrinks = signal<string>('has Drinks');
  hasItems = signal<string>('has Items');
  items = signal<string>('Items');
  noSelectionsYet = signal<string>('No selections yet');
  saveChanges = signal<string>('Save Changes');

  setLanguage(language: string) {
    this.languageSubject.next(language);
    this.updateTitles(); // Update titles when language changes
  }

  getLanguage(): string {
    return this.languageSubject.value;
  }

  constructor() {
    this.updateTitles(); // Set titles based on the default language on initialization
  }

  private updateTitles() {
    switch (this.getLanguage()) {
      case 'Ar':
        this.DropDownTitle.set('اختر الموقع');
        this.TableTitle.set('رقم الطاولة');
        this.TotalTitle.set('الإجمالي');
        this.OrderButton.set('أرسل الطلب');
        this.NotesButton.set('ملاحظات');
        this.MenuPageTitle.set('قائمة الطعام');
        this.OurBranches.set('أفرعنا');
        this.CallBranch.set('اتصل بنا');
        this.GetDirection.set('الموقع');
        this.OurOffers.set('عروضنا');
        this.OurApplication.set('تطبيقاتنا');
        this.OurSocials.set('السوشال ميديا');
        this.Description.set('الوصف');
        this.LearnMore.set('المزيد');
        this.Home.set('الرئيسة');
        this.Menu.set('المنيو');
        this.Cart.set('الطلب');
        this.SuccessOrder.set('لقد تم إرسال طلبكم بنجاح');
        this.Thanks.set('شكراً لاختياركم هانغري بيرد');
        this.RatingReminder.set(
          'رأيك مهم بالنسبة لنا! لا تنسى تقييم طلبك ومساعدتنا في تحسين تجربتك'
        );
        this.RateUs.set('قيم طلبك');
        this.CannotRate.set('شكرا لكم لقد تم تقييم طلبكم من قبل');
        this.YourOpinion.set('رأيكم يهمنا');
        this.StudentOrder.set(
          'للحصول على خصم الطالب الرجاء إدخال رقم الطالب الخاص بك'
        );
        this.TypeOfOrder.set('الرجاء تحديد مكان الطلب');
        this.DineIn.set('في المطعم');
        this.TakeAway.set('طلب خارجي');

        //cashier interface
        this.NewOrderPageTitle.set('الطلبات الجديدة');
        this.OrderNumber.set('رقم الطلب');
        this.TableNumber.set('رقم الطاولة');
        this.Total.set('الإجمالي');
        this.Time.set('الوقت');
        this.OrderDetails.set('تفاصيل الطلب');
        this.ViewOrderDetails.set('عرض تفاصيل الطلب');
        this.ReadyOrders.set('الطلبات الجاهزة');
        this.setOrderReady.set('الطلب جاهز');

        //single Order Page
        this.ItemName.set('اسم العنصر');
        this.ItemCount.set('عدد العناصر');
        this.ItemNote.set('ملاحظة العنصر');
        this.price.set('السعر');
        this.OrderSaved.set('تم حفظ الطلب');

        //Ordres History
        this.OrdersHistory.set('الطلبات السابقة');
        this.Date.set('التاريخ');

        this.NewOrders.set('الطلبات الجديدة');
        this.TodaysOrder.set('طلبات اليوم');
        this.PrintOrder.set('اطبع الطلب');

        //sucessmessage
        this.YourOrderID.set('رقم الطلبك');

        //notesOverlay
        this.notesTitle.set('اكتب ملاحظاتك');
        this.notesPlaceholder.set('على سبيل المثال: لا مخللات، صلصة شيدر');

        //scanner
        this.scannerTitle.set('الرجاء مسح كود المنيو أمامكم');
        this.scannerCloseButton.set('أغلق النافذة');

        //Save
        this.Save.set('حفظ');

        //rating
        this.ratingMessage.set(
          'شكرا لكم على التقييم! نحن في انتظاركم مرة أخرى'
        );
        this.validate.set('التحقق');
        this.categoryName.set('فئة');

        //Payment
        this.PaymentMethod.set('اختر طريقة الدفع الخاصة بك');
        this.PayCashier.set('ادفع عند الكاشير');
        this.PayCard.set('الدفع بالبطاقة');
        this.PhoneVerification.set('التحقق من رقم الهاتف');
        this.Accept.set('أوافق على تلقي رسائل الحملات والعروض الترويجية');
        this.GetCode.set('احصل على الرمز');
        this.VerificationSent.set(
          'تم إرسال رمز التحقق إلى رقمك عبر رسالة نصية. يرجى إدخاله أدناه'
        );
        this.SendOrder.set('إرسال الطلب');
        this.VerificationCode.set('رمز التحقق');
        this.ContinueToPayment.set('المتابعة للدفع');
        this.EnterNumber.set('يرجى إدخال رقم هاتفك. سيتم إرسال رسالة إليك عند تجهيز طلبك');
        this.SendingCode.set('يتم إرسال رمز إليك');

        //Admin Interface
        this.CategroyNameAdmin.set('اسم الفئة');
        this.UploadImage.set('تحميل الصورة');
        this.AddCategroy.set('إضافة فئة');
        this.LogOut.set('تسجيل الخروج');
        this.MenuList.set('قائمة الطعام');
        this.CategoryList.set('قائمة الفئات');
        this.MenuOrder.set('ترتيب القائمة');
        this.CategoryOrder.set('ترتيب الفئات');
        this.SubCategoryOrder.set('ترتيب الفئات الفرعية');
        this.Offers.set('العروض');
        this.ExportMenu.set('تصدير القائمة');
        this.IncreasePrice.set('زيادة السعر بنسبة');
        this.DecreasePrice.set('خفض السعر بنسبة');
        this.PercentagePrice.set('السعر بالنسبة المئوية');
        this.PercentageDiscountPrice.set('سعر الخصم بالنسبة المئوية');
        this.Categories.set('الفئات');
        this.NoCategories.set('لا توجد فئات');
        this.Search.set('البحث');
        this.MenuItems.set('عناصر القائمة');
        this.AddItem.set('إضافة عنصر');
        this.Image.set('الصورة');
        this.Name.set('الاسم');
        this.Price.set('السعر');
        this.ProductName.set('اسم المنتج');
        this.NumberOrder.set('عدد مرات الطلب');
        this.StudentPrice.set('سعر الطالب');
        this.Category.set('الفئة');
        this.Prices.set('الأسعار');
        this.MenuItemsOrder.set('ترتيب عناصر القائمة');
        this.SelectCategory.set('اختر الفئة');
        this.Discount.set('الخصم');
        this.AddOffer.set('إضافة عرض');
        this.ExportMenuExcel.set('تصدير القائمة إلى إكسل');
        this.ExportMenuPDF.set('PDF تصدير القائمة إلى ');
        this.SubCategories.set('قائمة الفئات الفرعية');
        this.addSubCategory.set('إضافة فئة فرعية');
        this.isSubCategory.set('هو فئة فرعية');
        this.viewMenuItems.set('عرض عناصر القائمة');
        this.menuItemsOfSubCategory.set('عناصر القائمة للفئة الفرعية');

        //Dashboard
        this.Dashboard.set('لوحة التحكم');
        this.numberOfOrders.set('عدد الطلبات');
        this.numberOfDineInOrders.set('عدد الطلبات الداخلية');
        this.numberOfTakeAwayOrders.set('عدد طلبات السفري');
        this.totalSalesPerMonth.set('إجمالي المبيعات شهرياً');
        this.paidByCashier.set('مدفوع من الكاشير');
        this.paidByCard.set('مدفوع بالبطاقة');
        this.numberOfSoldItems.set('عدد العناصر المباعة');
        this.topSale5Items.set('أعلى 5 عناصر مبيعاً');
        this.salesBetweenMonths.set('المبيعات بين الأشهر');
        this.salesBetweenBranches.set('المبيعات بين الفروع');
        this.selectYear.set('اختر السنة:');
        this.selectMonth.set('اختر الشهر:');
        this.cashierPaymentManager.set('مدير مدفوعات الكاشير');
        this.selectBranch.set('اختر الفرع:');
        this.startDate.set('تاريخ البداية:');
        this.endDate.set('تاريخ الانتهاء:');
        this.selectedBranch.set('الفرع المحدد:');
        this.chosenDate.set('التاريخ المختار:');
        this.totalSales.set('إجمالي المبيعات:');
        this.orderID.set('رقم الطلب');
        this.totalPrice.set('السعر الإجمالي');
        this.onlinePaymentManager.set('مدير المدفوعات الإلكترونية');
        this.salesPerformanceBetweenPreviousTwoMonths.set('أداء المبيعات بين الشهرين السابقين');
        this.itemPerformancePerBranch.set('أداء العناصر لكل فرع');
        this.selectCategory.set('اختر الفئة:');
        this.selectMenuItem.set('اختر عنصر القائمة:');
        this.noSalesDataAvailable.set('لا توجد بيانات مبيعات متاحة للفئة المحددة، عنصر القائمة، الشهر، والسنة.');
        //notes overlay
        this.selectYourOptions.set('اختر خياراتك:');
        this.drinks.set('المشروبات');
        this.sandwich.set('ساندويتش');
        this.saveChoices.set('احفظ الاختيارات');

        this.manageMenuItemOptions.set('إدارة خيارات عناصر القائمة');
        this.pleaseSelectFollowing.set('يرجى اختيار ما يلي');
        this.hasDrinks.set('يحتوي على مشروبات');
        this.hasItems.set('يحتوي على عناصر');
        this.items.set('العناصر');
        this.noSelectionsYet.set('لا توجد اختيارات بعد');
        this.saveChanges.set('حفظ التغييرات');
        break;
      case 'Tr':
        this.DropDownTitle.set('Konum Seçin');
        this.TableTitle.set('Masa Numarası');
        this.TotalTitle.set('Toplam');
        this.OrderButton.set('Sipariş Ver');
        this.NotesButton.set('Sipariş Notu');
        this.MenuPageTitle.set('Bizim Menu');
        this.OurBranches.set('Şübelerimiz');
        this.CallBranch.set('Bizi Arayın');
        this.GetDirection.set('Yol Tarifi');
        this.OurOffers.set('Kampanyalarımız');
        this.OurApplication.set('Uygulamamız');
        this.OurSocials.set('Sosyal Medyamız');
        this.Description.set('Açıklama');
        this.LearnMore.set('Daha Fazla');
        this.Home.set('Ana Sayfa');
        this.Menu.set('Menü');
        this.Cart.set('Sepet');
        this.SuccessOrder.set('Siparişiniz alındı');
        this.Thanks.set('Hungry Birds Tercih Ettiğiniz İçin Teşekkür Ederiz');
        this.OrderSaved.set('Siparişi Kaydet');
        this.RatingReminder.set(
          'Fikriniz bizim için önemli! Siparişinizi değerlendirmeyi unutmayın ve deneyiminizi iyileştirmemize yardımcı olun.'
        );
        this.RateUs.set('Siparişini Değerlendir');
        this.CannotRate.set(
          'Değerlendirmeniz için Teşekkür Ederiz Bu sipariş daha önceden değerlendirilmiştir.'
        );
        this.YourOpinion.set('Puanınız');
        this.StudentOrder.set(
          'Öğrenci indirim almak için lütfen öğrenci numaranızı giriniz'
        );
        this.TypeOfOrder.set('Sipariş Türü');
        this.TakeAway.set('Paket');
        this.DineIn.set('Restauranda');

        //cashier Interface
        this.NewOrderPageTitle.set('Yeni Siparişler');
        this.OrderNumber.set('Sipariş Numarası');
        this.TableNumber.set('Masa Numarası');
        this.Total.set('Toplam');
        this.Time.set('Saat');
        this.OrderDetails.set('Sipariş Detayları');
        this.ViewOrderDetails.set('Sipariş Detayları');
        this.ReadyOrders.set('Hazır Siparişler');
        this.setOrderReady.set('Sipariş Hazır');

        //single Order Page
        this.ItemName.set('Ürün Adı');
        this.ItemCount.set('Ürün Adedi');
        this.ItemNote.set('Ürün Notu');
        this.price.set('Fiyat');

        //Todays Orders
        this.TodaysOrder.set('Bügünün Siparişlers');

        //Ordres History
        this.OrdersHistory.set('Sipariç Geçmişi');
        this.Date.set('Tarih');

        this.OrderSaved.set('Sipariş Kaydet');
        this.PrintOrder.set('Siparişi Yazdır');

        this.NewOrders.set('Yeni Siparişler');

        this.YourOrderID.set('sipariş numaranız');

        //notesOverlay
        this.notesTitle.set('Not Ekle');
        this.notesPlaceholder.set('Örnek: Turşusuz, Cheddar Sosu');

        //scanner
        this.scannerTitle.set('Lütfen Menu QR kodunu tarayın');
        this.scannerCloseButton.set('tarayıcıyı kapat');

        //Save
        this.Save.set('kaydet');
        //rating
        this.ratingMessage.set(
          'Puanladığınız için teşekkür ederiz! Sizi tekrar görmek için sabırsızlanıyoruz.'
        );
        this.validate.set('kontrol et');
        this.categoryName.set('kategori');

        //Payment
        this.PaymentMethod.set('Ödeme Yönteminizi Seçin');
        this.PayCashier.set('Kasada Öde');
        this.PayCard.set('Kartla Öde');
        this.PhoneVerification.set('Telefon Numarası Doğrulama');
        this.Accept.set(
          'Kampanya ve promosyon teklif mesajları almayı kabul ediyorum.'
        );
        this.GetCode.set('Kod Al');
        this.VerificationSent.set(
          'Doğrulama Kodu numaranıza SMS ile gönderildi. Lütfen aşağıya giriniz.'
        );
        this.SendOrder.set('Siparişi Gönder');
        this.VerificationCode.set('Doğrulama Kodu');
        this.ContinueToPayment.set('Ödemeye Geç');
        this.EnterNumber.set('Lütfen telefon numaranızı girin. Siparişiniz hazır olduğunda size bir mesaj gönderilecektir.');
        this.SendingCode.set('Size bir kod gönderiliyor.');

        //Admin Interface
        this.CategroyNameAdmin.set('Kategori Adı');
        this.UploadImage.set('Görsel Yükle');
        this.AddCategroy.set('Kategori Ekle');
        this.LogOut.set('Çıkış Yap');
        this.MenuList.set('Menü Listesi');
        this.CategoryList.set('Kategori Listesi');
        this.MenuOrder.set('Menü Sıralaması');
        this.CategoryOrder.set('Kategori Sıralaması');
        this.SubCategoryOrder.set('Alt Kategori Sıralaması');
        this.Offers.set('Kampanyalar');
        this.ExportMenu.set('Menü Dışa Aktar');
        this.IncreasePrice.set('Fiyatı Artır');
        this.DecreasePrice.set('Fiyatı Azalt');
        this.PercentagePrice.set('Yüzdelik Fiyat');
        this.PercentageDiscountPrice.set('Yüzdelik İndirim Fiyatı');
        this.Categories.set('Kategoriler');
        this.NoCategories.set('Kategoriler yok');
        this.Search.set('Ara');
        this.MenuItems.set('Menü Öğeleri');
        this.AddItem.set('Öğe Ekle');
        this.Image.set('Görsel');
        this.Name.set('Ad');
        this.Price.set('Fiyat');
        this.ProductName.set('Ürün Adı');
        this.NumberOrder.set('Sipariş Verilen Sayısı');
        this.StudentPrice.set('Öğrenci Fiyatı');
        this.Category.set('Kategori');
        this.Prices.set('Fiyatlar');
        this.MenuItemsOrder.set('Menü Öğeleri Sıralaması');
        this.SelectCategory.set('Kategori Seç');
        this.Discount.set('Indirim');
        this.AddOffer.set('Kampanya Ekle');
        this.ExportMenuExcel.set("Menü Excel'e Aktar");
        this.ExportMenuPDF.set("Menü PDF'ye Aktar");
        this.SubCategories.set('Alt Kategoriler');
        this.addSubCategory.set('Alt Kategori Ekle');
        this.isSubCategory.set('Alt Kategori mi');
        this.viewMenuItems.set('Menü Öğelerini Görüntüle');
        this.menuItemsOfSubCategory.set('Alt Kategorinin Menü Öğeleri');
        this.Dashboard.set('Gösterge Paneli');

        //Dashboard
        this.numberOfOrders.set('Sipariş Sayısı');
        this.numberOfDineInOrders.set('Restoranda Yenen Sipariş Sayısı');
        this.numberOfTakeAwayOrders.set('Paket Sipariş Sayısı');
        this.totalSalesPerMonth.set('Aylık Toplam Satış');
        this.paidByCashier.set('Kasiyer Tarafından Ödendi');
        this.paidByCard.set('Kartla Ödendi');
        this.numberOfSoldItems.set('Satılan Ürün Sayısı');
        this.topSale5Items.set('En Çok Satan 5 Ürün');
        this.salesBetweenMonths.set('Aylara Göre Satışlar');
        this.salesBetweenBranches.set('Şubeler Arası Satışlar');
        this.selectYear.set('Yıl Seç:');
        this.selectMonth.set('Ay Seç:');
        this.cashierPaymentManager.set('Kasiyer Ödeme Yöneticisi');
        this.selectBranch.set('Şube Seç:');
        this.startDate.set('Başlangıç Tarihi:');
        this.endDate.set('Bitiş Tarihi:');
        this.selectedBranch.set('Seçilen Şube:');
        this.chosenDate.set('Seçilen Tarih:');
        this.totalSales.set('Toplam Satış:');
        this.orderID.set('Sipariş Kimliği');
        this.totalPrice.set('Toplam Fiyat');
        this.onlinePaymentManager.set('Çevrimiçi Ödeme Yöneticisi');
        this.salesPerformanceBetweenPreviousTwoMonths.set(
          'Önceki İki Ay Arasındaki Satış Performansı'
        );
        this.itemPerformancePerBranch.set('Şube Bazında Ürün Performansı');
        this.selectCategory.set('Kategori Seç:');
        this.selectMenuItem.set('Menü Öğesi Seç:');
        this.noSalesDataAvailable.set('Seçilen kategori, menü öğesi, ay ve yıl için satış verisi bulunmamaktadır.');


        //notes overlay
        this.selectYourOptions.set('Seçeneklerinizi Seçin:');
        this.drinks.set('İçecekler');
        this.sandwich.set('Sandviç');
        this.saveChoices.set('Seçimleri Kaydet');

        this.manageMenuItemOptions.set('Menü Öğesi Seçeneklerini Yönet');
        this.pleaseSelectFollowing.set('Lütfen aşağıdakileri seçin');
        this.hasDrinks.set('İçecekleri içerir');
        this.hasItems.set('Ürünleri içerir');
        this.items.set('Ürünler');
        this.noSelectionsYet.set('Henüz seçim yok');
        this.saveChanges.set('Değişiklikleri Kaydet');
        break;
      default:
        this.DropDownTitle.set('Choose Location');
        this.TableTitle.set('Table Number');
        this.TotalTitle.set('Total');
        this.OrderButton.set('Order');
        this.NotesButton.set('Order Notes');
        this.MenuPageTitle.set('Our Menu');
        this.OurBranches.set('Our Branches');
        this.CallBranch.set('Call Branch');
        this.GetDirection.set('Get Direction');
        this.OurOffers.set('Our Offers');
        this.OurApplication.set('Our Application');
        this.OurSocials.set('Our Social Media');
        this.Description.set('Description');
        this.LearnMore.set('Learn More');
        this.Home.set('Home');
        this.Menu.set('Menu');
        this.Cart.set('Cart');
        this.SuccessOrder.set('Your Order Has been Sent Successfully');
        this.Thanks.set('Thank You for Choosing Hungry Birds');
        this.RatingReminder.set(
          "Your opinion matters to us! Don't forget to rate your order and help us improve your experience."
        );
        this.RateUs.set('Rate Us');
        this.CannotRate.set(
          'Thank you for your time this order has been rated.'
        );
        this.YourOpinion.set('Your Opinion');
        this.StudentOrder.set(
          'To Get Student Price Please Enter Your Student Number'
        );
        this.TypeOfOrder.set('Type Of Order');
        this.DineIn.set('Dine In');
        this.TakeAway.set('Take Away');
        //cashier interface
        this.NewOrderPageTitle.set('New Orders');
        this.OrderNumber.set('Order Number');
        this.TableNumber.set('Table Number');
        this.Total.set('Total');
        this.Time.set('Time');
        this.OrderDetails.set('Order Details');
        this.ViewOrderDetails.set('View Order Details');
        this.ReadyOrders.set('Ready Orders');
        this.setOrderReady.set('Order Ready');

        //single Order Page
        this.ItemName.set('Item Name');
        this.ItemCount.set('Item Count');
        this.ItemNote.set('Item Note');
        this.price.set('Price');
        this.OrderSaved.set('Order Saved');
        this.PrintOrder.set('Print the Order');

        //Ordres History
        this.OrdersHistory.set('Orders History');
        this.Date.set('Date');

        //Ordres History
        this.OrdersHistory.set('Orders History');
        this.Date.set('Date');

        this.NewOrders.set('New Orders');
        this.TodaysOrder.set("Today's Orders");

        this.YourOrderID.set('Your Order Number');

        //notesOverlay
        this.notesTitle.set('Enter your notes');
        this.notesPlaceholder.set('For Example: No Pickles, Cheddar Sauce');

        //scanner
        this.scannerTitle.set('Please scan the Menu QR code');
        this.scannerCloseButton.set('Close Scanner');

        //rating
        this.ratingMessage.set(
          'Thank you for rating! We are waiting for you again'
        );

        //Save
        this.Save.set('Save');
        this.validate.set('validate');
        this.categoryName.set('Category');

        //Payment
        this.PaymentMethod.set('Choose Your Payment Method');
        this.PayCashier.set('Pay At The Cashier');
        this.PayCard.set('Pay By Card');
        this.PhoneVerification.set('Phone Number Verification');
        this.Accept.set(
          'I accept receiving campaigns and promotional offers messages'
        );
        this.GetCode.set('Get Code');
        this.VerificationSent.set(
          'A Verification Code has been sent to Your Number Via SMS. Please enter it below.'
        );
        this.SendOrder.set('Send Order');
        this.VerificationCode.set('Verification Code');
        this.ContinueToPayment.set('Continue To Payment');
        this.EnterNumber.set('Please enter your phone number. A message will be sent to you when your order is ready.');
        this.SendingCode.set('A code is being sent to you.');

        //Admin Interface
        this.CategroyNameAdmin.set('Category Name');
        this.UploadImage.set('Upload Image');
        this.AddCategroy.set('Add Category');
        this.LogOut.set('Log Out');
        this.MenuList.set('Menu List');
        this.CategoryList.set('Category List');
        this.MenuOrder.set('Menu Order');
        this.CategoryOrder.set('Categories Order');
        this.SubCategoryOrder.set('Sub Categories Order');
        this.Offers.set('Offers');
        this.ExportMenu.set('Export Menu');
        this.IncreasePrice.set('Increase price by');
        this.DecreasePrice.set('Decrease price by');
        this.PercentagePrice.set('Percentage Price');
        this.PercentageDiscountPrice.set('Percentage discount Price');
        this.Categories.set('Categories');
        this.NoCategories.set('There are no categories');
        this.Search.set('Search');
        this.MenuItems.set('Menu Items');
        this.AddItem.set('Add Item');
        this.Image.set('Image');
        this.Name.set('Name');
        this.Price.set('Price');
        this.ProductName.set('Product Name');
        this.NumberOrder.set('Number Of times Ordered');
        this.StudentPrice.set('Student Price');
        this.Category.set('Category');
        this.Prices.set('Prices');
        this.MenuItemsOrder.set('Menu Items Order');
        this.SelectCategory.set('Select Category');
        this.Discount.set('Discount');
        this.AddOffer.set('Add Offer');
        this.ExportMenuExcel.set('Export Menu Excel');
        this.ExportMenuPDF.set('Export Menu PDF');
        this.SubCategories.set('Sub Categories List');
        this.addSubCategory.set('Add Sub Category');
        this.isSubCategory.set('is Sub Category');
        this.viewMenuItems.set('View Menu Items');
        this.menuItemsOfSubCategory.set('Menu Items Of Sub Category');

        //Dashboard
        this.Dashboard.set('Dashboard');
        this.numberOfOrders.set('Number Of Orders');
        this.numberOfDineInOrders.set('Number Of Dine In Orders');
        this.numberOfTakeAwayOrders.set('Number Of Take Away Orders');
        this.totalSalesPerMonth.set('Total Sales Per Month');
        this.paidByCashier.set('Paid By Cashier');
        this.paidByCard.set('Paid By Card');
        this.numberOfSoldItems.set('Number Of Sold Items');
        this.topSale5Items.set('Top Sale 5 Items');
        this.salesBetweenMonths.set('Sales Between Months');
        this.salesBetweenBranches.set('Sales Between Branches');
        this.selectYear.set('Select Year:');
        this.selectMonth.set('Select Month:');
        this.cashierPaymentManager.set('Cashier Payment Manager');
        this.selectBranch.set('Select Branch:');
        this.startDate.set('Start Date:');
        this.endDate.set('End Date:');
        this.selectedBranch.set('Selected Branch:');
        this.chosenDate.set('Chosen Date:');
        this.totalSales.set('Total Sales:');
        this.orderID.set('Order ID');
        this.totalPrice.set('Total Price');
        this.onlinePaymentManager.set('Online Payment Manager');
        this.salesPerformanceBetweenPreviousTwoMonths.set(
          'Sales Performance Between Previous Two Months'
        );
        this.itemPerformancePerBranch.set('Item Performance Per Branch');
        this.selectCategory.set('Select Category:');
        this.selectMenuItem.set('Select Menu Item:');
        this.noSalesDataAvailable.set('No sales data available for the selected category, menu item, month, and year.');


        //notes overlay
        this.selectYourOptions.set('Select Your Options:');
        this.drinks.set('Drinks');
        this.sandwich.set('Sandwich');
        this.saveChoices.set('Save Choices');

        this.manageMenuItemOptions.set('Manage MenuItem Options');
        this.pleaseSelectFollowing.set('Please select the following');
        this.hasDrinks.set('has Drinks');
        this.hasItems.set('has Items');
        this.drinks.set('Drinks');
        this.items.set('Items');
        this.noSelectionsYet.set('No selections yet');
        this.saveChanges.set('Save Changes');
        break;
    }
  }
}
