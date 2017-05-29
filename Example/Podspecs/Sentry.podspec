# Creates a dummy CocoaPod to replace the sentry ones in emission deploys
# See https://github.com/artsy/emission-nebula/issues/3 for full context

Pod::Spec.new do |s|
  s.name         = "Sentry"
  s.version      = "2.1.9"
  s.summary      = "A short description of Sentry."
  s.description  = "Empty description"
  s.homepage     = "http://github.com/artsy/emission"
  s.license      = "MIT"
  s.author       = { "Orta Therox" => "orta.therox@gmail.com" }
  s.source_files = ""
  s.source       = { :git => 'https://github.com/artsy/Emission.git', :tag => '1.0.0' }
end
