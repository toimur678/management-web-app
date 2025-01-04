# Kullanım Kılavuzu

## Gereksinimler
Bu projeyi çalıştırmadan önce, aşağıdakilere sahip olduğunuzdan emin olun:

- Node.js
- XAMPP

## Kurulum
1. Projeyi zip dosyası olarak indirin ve zip dosyasını açın.
2. Projeyi Visual Studio Code'da açın.
3. VS Code'da bir terminal açın ve uygulama dizinine gidin:
    ```bash
    cd app
    ```
4. Gereksinimleri yüklemek için aşağıdaki komutu çalıştırın:
    ```bash
    npm install
    ```
5. Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```
6. VS Code'da başka bir terminal açın ve sunucu dizinine gidin:
    ```bash
    cd server
    ```
7. Sunucu bağımlılıklarını yükleyin:
    ```bash
    npm install
    ```
8. Sunucuyu başlatın:
    ```bash
    npm start
    ```

## Veritabanı Kurulumu
1. XAMPP'ı başlatın ve Apache ve MySQL servislerinin çalıştığından emin olun.
2. Web tarayıcınızı açın ve localhost/phpmyadmin adresine gidin.
3. Yeni bir veritabanı oluşturun ve adını "app" olarak belirtin.
4. Sağlanan SQL dosyasını "backup.sql" veritabanına içe aktarın.