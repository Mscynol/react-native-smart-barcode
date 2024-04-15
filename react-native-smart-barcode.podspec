require "json"

Pod::Spec.new do |s|
  # NPM package specification
  package = JSON.parse(File.read(File.join(File.dirname(__FILE__), "package.json")))

  s.name = package['name']
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/Mscynol/react-native-smart-barcode"
  s.license = package['license']
  s.author       = { package["author"]["name"] => package["author"]["email"] }
  s.source = { :path => '.' }
  s.platform = :ios, "8.0"
  s.dependency 'React-Core'
  s.source_files = "ios/RCTBarcode/RCTBarcode/.{h,m}"
  s.resources = ['ios/raw/']

  if defined?(install_modules_dependencies()) != nil
    install_modules_dependencies(s);
  else
    s.dependency "React-Core"
  end
end
