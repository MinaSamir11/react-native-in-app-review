require "json"
version = JSON.parse(File.read("./package.json"))["version"]

Pod::Spec.new do |s|
  s.name           = "react-native-in-app-review"
  s.version        = version
  s.summary        = "Rating App in App Store for react native apps"
  s.homepage       = "https://github.com/MinaSamir11/react-native-in-app-review"
  s.license        = "MIT"
  s.author         = { "Mina Samir" => "menasamer11@gmail.com" }
  s.platform       = :ios, "7.0"
  s.source         = { :git => "https://github.com/MinaSamir11/react-native-in-app-review.git", :tag => "v#{s.version}" }
  s.source_files   = 'ios/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.requires_arc = true
  s.dependency "React"

end