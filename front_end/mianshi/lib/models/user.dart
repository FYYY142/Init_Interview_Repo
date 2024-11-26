class User {
  final int id;
  final String username;
  final String? passwordHash; // 可选字段，一般不需要在前端存储
  final DateTime updatedAt;
  final DateTime createdAt;

  User._({
    required this.id,
    required this.username,
    this.passwordHash,
    required this.updatedAt,
    required this.createdAt,
  });

  // 从 JSON 创建用户实例的工厂构造函数
  factory User.fromJson(Map<String, dynamic> json) {
    return User._(
      id: json['id'] as int,
      username: json['username'] as String,
      passwordHash: json['passwordHash'] as String?,
      updatedAt: DateTime.parse(json['updatedAt']),
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  // 从注册响应创建用户实例的工厂方法
  factory User.fromRegisterResponse(Map<String, dynamic> response) {
    final userData = response['user'] as Map<String, dynamic>;
    return User.fromJson(userData);
  }

  // 转换为 JSON 的方法
  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'updatedAt': updatedAt.toIso8601String(),
    'createdAt': createdAt.toIso8601String(),
  };


}